const socket = io();

// 本地暫存狀態
let playerState = null;
let allItems = {};
let allAreas = [];
let pendingFoundItem = null;

// DOM 元素
const hudName = document.getElementById('hud-name');
const hudLevel = document.getElementById('hud-level');
const hpBar = document.getElementById('hp-bar');
const hpText = document.getElementById('hp-text');
const spBar = document.getElementById('sp-bar');
const spText = document.getElementById('sp-text');
const areaTitle = document.getElementById('area-title');
const areaDesc = document.getElementById('area-desc');
const combatLog = document.getElementById('combat-log');
const inventoryGrid = document.getElementById('inventory-grid');
const recipeList = document.getElementById('recipe-list');
const discoveryCard = document.getElementById('discovery-card');
const discItemName = document.getElementById('disc-item-name');
const discItemDesc = document.getElementById('disc-item-desc');
const mapModal = document.getElementById('map-modal');
const areaSelector = document.getElementById('area-selector');

// 按鈕
const btnSearch = document.getElementById('btn-search');
const btnRest = document.getElementById('btn-rest');
const btnPickup = document.getElementById('btn-pickup');
const btnDiscard = document.getElementById('btn-discard');
const btnOpenMap = document.getElementById('btn-open-map');
const btnCloseMap = document.getElementById('btn-close-map');

// 寫入 Log
function logMessage(text, type = 'sys-msg') {
  const entry = document.createElement('div');
  entry.className = `log-entry ${type}`;
  entry.innerText = text;
  combatLog.appendChild(entry);
  combatLog.scrollTop = combatLog.scrollHeight;
}

// 刷新 HUD 與背包
function renderHUD(player) {
  playerState = player;
  hudName.innerText = player.name;
  hudLevel.innerText = `Lv.${player.level}`;

  const hpPercent = Math.max(0, (player.hp / player.maxHp) * 100);
  const spPercent = Math.max(0, (player.sp / player.maxSp) * 100);

  hpBar.style.width = `${hpPercent}%`;
  hpText.innerText = `${player.hp} / ${player.maxHp}`;

  spBar.style.width = `${spPercent}%`;
  spText.innerText = `${player.sp} / ${player.maxSp}`;

  // 渲染背包 6 格 (支援按鍵標籤 1~6)
  inventoryGrid.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const slot = document.createElement('div');
    const itemId = player.inventory[i];
    slot.className = `inv-slot ${itemId ? 'occupied' : ''}`;
    
    if (itemId && allItems[itemId]) {
      const it = allItems[itemId];
      let tagText = '';
      if (it.type === 'weapon') tagText = `攻+${it.atk}`;
      else if (it.type === 'armor') tagText = `防+${it.def}`;
      else if (it.heal_hp) tagText = `+${it.heal_hp}HP`;
      else if (it.heal_sp) tagText = `+${it.heal_sp}SP`;
      else tagText = '素材';

      slot.innerHTML = `<strong>${it.name}</strong><span class="slot-tag">${tagText}</span>`;
      slot.onclick = () => {
        socket.emit('use_item', { slotIndex: i });
      };
    } else {
      slot.innerHTML = `<span style="color:#475569; font-size:0.7rem;">[${i+1}]</span>`;
    }
    inventoryGrid.appendChild(slot);
  }
}

// 刷新可用合成
function renderRecipes(recipes) {
  recipeList.innerHTML = '';
  if (!recipes || recipes.length === 0) {
    recipeList.innerHTML = '<div class="no-recipe">背包內無可合成組合</div>';
    return;
  }

  recipes.forEach(r => {
    const chip = document.createElement('div');
    chip.className = 'recipe-chip';
    chip.innerHTML = `<span>🔨</span> <span>${r.resultName}</span>`;
    chip.onclick = () => {
      socket.emit('craft', { resultId: r.result });
    };
    recipeList.appendChild(chip);
  });
}

// 進入遊戲
socket.emit('join_game', { name: '受試者 #01', roomId: 'solo' });

socket.on('game_state', (data) => {
  allItems = data.items;
  allAreas = data.areas;
  renderHUD(data.player);
  renderRecipes(data.recipes);

  const curArea = allAreas.find(a => a.id === data.player.area);
  if (curArea) {
    areaTitle.innerText = curArea.name;
    areaDesc.innerText = curArea.desc;
  }
  logMessage(`抵達試驗場地：${areaTitle.innerText}。請開始收集物資。`);
});

// 探索
function triggerSearch() {
  discoveryCard.classList.add('hidden');
  socket.emit('search');
}
btnSearch.onclick = triggerSearch;

socket.on('search_result', (res) => {
  if (res.error) {
    logMessage(res.error, 'warn-msg');
    return;
  }

  renderHUD(res.player);
  pendingFoundItem = res.foundItem;
  discItemName.innerText = pendingFoundItem.name;
  discItemDesc.innerText = pendingFoundItem.desc;
  discoveryCard.classList.remove('hidden');
  logMessage(`探索發現了 [${pendingFoundItem.name}]！`, 'gain-msg');
});

// 拾取 / 丟棄
function triggerPickup() {
  if (pendingFoundItem) {
    socket.emit('pickup', { itemId: pendingFoundItem.id });
    discoveryCard.classList.add('hidden');
    pendingFoundItem = null;
  }
}

function triggerDiscard() {
  discoveryCard.classList.add('hidden');
  pendingFoundItem = null;
}

btnPickup.onclick = triggerPickup;
btnDiscard.onclick = triggerDiscard;

// 休息
function triggerRest() {
  socket.emit('rest');
}
btnRest.onclick = triggerRest;

socket.on('rest_result', (res) => {
  renderHUD(res.player);
  logMessage('在角落短暫調息，恢復了體力與精力 (+15 HP, +15 SP)。', 'gain-msg');
});

// 拾取/合成/使用後的狀態刷新
socket.on('update_inventory', (data) => {
  renderHUD(data.player);
  renderRecipes(data.availableRecipes);
});

socket.on('craft_success', (res) => {
  renderHUD(res.player);
  renderRecipes(res.availableRecipes);
  logMessage(`成功打造出高階物品：[${res.resultItem.name}]！獲得 20 經驗值。`, 'craft-msg');
});

socket.on('action_error', (msg) => {
  logMessage(msg, 'warn-msg');
});

// 地圖移動
btnOpenMap.onclick = () => {
  areaSelector.innerHTML = '';
  allAreas.forEach(a => {
    const btn = document.createElement('button');
    btn.className = 'area-choice-btn';
    btn.innerText = a.name;
    btn.onclick = () => {
      socket.emit('move', { areaId: a.id });
      mapModal.classList.add('hidden');
    };
    areaSelector.appendChild(btn);
  });
  mapModal.classList.remove('hidden');
};

btnCloseMap.onclick = () => {
  mapModal.classList.add('hidden');
};

socket.on('move_result', (res) => {
  renderHUD(res.player);
  areaTitle.innerText = res.area.name;
  areaDesc.innerText = res.area.desc;
  discoveryCard.classList.add('hidden');
  logMessage(`移動至新區域：[${res.area.name}]。`, 'sys-msg');
});

// 桌機鍵盤快捷鍵支援
window.addEventListener('keydown', (e) => {
  // 若彈窗開啟，Escape 關閉
  if (e.key === 'Escape' && !mapModal.classList.contains('hidden')) {
    mapModal.classList.add('hidden');
    return;
  }

  // 探索發現中：Enter / Space 拾取，Escape 略過
  if (!discoveryCard.classList.contains('hidden')) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerPickup();
      return;
    }
    if (e.key === 'Escape' || e.key === 'x') {
      triggerDiscard();
      return;
    }
  }

  // 空白鍵或 S：探索
  if (e.key === ' ' || e.key.toLowerCase() === 's') {
    e.preventDefault();
    triggerSearch();
    return;
  }

  // R：休息
  if (e.key.toLowerCase() === 'r') {
    triggerRest();
    return;
  }

  // M：地圖
  if (e.key.toLowerCase() === 'm') {
    btnOpenMap.click();
    return;
  }

  // 數字鍵 1~6：快速使用/裝備背包對應格
  if (e.key >= '1' && e.key <= '6') {
    const slotIdx = parseInt(e.key) - 1;
    socket.emit('use_item', { slotIndex: slotIdx });
    return;
  }

  // C：若有可用配方，合成第一個
  if (e.key.toLowerCase() === 'c') {
    const firstChip = recipeList.querySelector('.recipe-chip');
    if (firstChip) firstChip.click();
    return;
  }
});
