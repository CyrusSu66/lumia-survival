// 基礎資料庫
const GAME_DATA = {
  areas: [
    { id: "school", name: "學校", desc: "荒廢的教學大樓，散落著文具與急救物資", items: ["branch", "bandage", "lighter", "pen", "water"] },
    { id: "hospital", name: "醫院", desc: "充滿消毒水氣味的診所，有豐富的醫療藥品", items: ["bandage", "scalpel", "pills", "needle", "water"] },
    { id: "factory", name: "工廠", desc: "廢棄重工業區，能找到各類金屬零件與工具", items: ["scrap_metal", "hammer", "iron_ore", "wire", "oil"] },
    { id: "forest", name: "森林", desc: "島嶼中央的繁茂樹林，適合採集天然素材與草藥", items: ["branch", "stone", "herb", "flower", "water"] },
    { id: "beach", name: "海灘", desc: "被海浪沖刷的海岸線，有貝殼、水與漂流廢鐵", items: ["scrap_metal", "stone", "water", "turtle_shell", "fish"] }
  ],
  items: {
    branch: { name: "樹枝", type: "material", desc: "隨處可見的堅韌樹枝" },
    stone: { name: "石頭", type: "material", desc: "硬質鵝卵石" },
    bandage: { name: "繃帶", type: "consumable", heal_hp: 20, desc: "乾淨的布條，可回復 20 HP" },
    pills: { name: "止痛藥", type: "consumable", heal_hp: 35, desc: "強效止痛藥，可回復 35 HP" },
    water: { name: "生水", type: "consumable", heal_sp: 25, desc: "甘甜的清水，可回復 25 SP" },
    lighter: { name: "打火機", type: "material", desc: "可以生火或加熱液體" },
    scrap_metal: { name: "廢鐵", type: "material", desc: "粗糙的鐵塊組件" },
    hammer: { name: "鐵鎚", type: "weapon", subType: "blunt", atk: 12, desc: "簡易鈍器 (+12 攻擊)" },
    scalpel: { name: "手術刀", type: "weapon", subType: "blade", atk: 14, desc: "鋒利的手術刀 (+14 攻擊)" },
    iron_ore: { name: "鐵礦石", type: "material", desc: "純淨的鐵礦" },
    herb: { name: "草藥", type: "consumable", heal_hp: 15, desc: "清涼草藥 (+15 HP)" },
    turtle_shell: { name: "龜殼", type: "material", desc: "硬實的防禦素材" },
    steel: { name: "鋼鐵", type: "material", desc: "精煉鋼材" },
    boiled_water: { name: "熱水", type: "consumable", heal_sp: 40, desc: "剛煮沸的水 (+40 SP)" },
    herbal_tea: { name: "草本茶", type: "consumable", heal_sp: 65, heal_hp: 15, desc: "舒緩身心的草藥茶 (+65 SP, +15 HP)" },
    first_aid_kit: { name: "急救包", type: "consumable", heal_hp: 70, desc: "專業戰地醫療包 (+70 HP)" },
    war_hammer: { name: "戰鎚", type: "weapon", subType: "blunt", atk: 32, desc: "沉重且致命的重錘 (+32 攻擊)" },
    steel_blade: { name: "精鋼短刀", type: "weapon", subType: "blade", atk: 36, desc: "冷光凜冽的鍛造短刀 (+36 攻擊)" },
    turtle_shield: { name: "龜甲盾", type: "armor", subType: "arm", def: 22, desc: "防護力極佳的臂甲 (+22 防禦)" }
  },
  recipes: [
    { result: "boiled_water", materials: ["water", "lighter"] },
    { result: "herbal_tea", materials: ["boiled_water", "herb"] },
    { result: "first_aid_kit", materials: ["bandage", "pills"] },
    { result: "steel", materials: ["scrap_metal", "iron_ore"] },
    { result: "war_hammer", materials: ["hammer", "steel"] },
    { result: "steel_blade", materials: ["scalpel", "steel"] },
    { result: "turtle_shield", materials: ["turtle_shell", "steel"] }
  ]
};

// 玩家狀態
const player = {
  name: "受試者 #01",
  hp: 100,
  maxHp: 100,
  sp: 80,
  maxSp: 80,
  level: 1,
  exp: 0,
  area: "school",
  equipment: { weapon: null, arm: null },
  inventory: [null, null, null, null, null, null]
};

let pendingFoundItem = null;
let selectedSlotIdx = null; // 當前選中要操作的背包格子

// DOM 元素快取
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

// 物品彈窗
const itemModal = document.getElementById('item-modal');
const itemModalTitle = document.getElementById('item-modal-title');
const itemModalDesc = document.getElementById('item-modal-desc');
const btnModalUse = document.getElementById('btn-modal-use');
const btnModalDrop = document.getElementById('btn-modal-drop');
const btnModalCancel = document.getElementById('btn-modal-cancel');

const btnSearch = document.getElementById('btn-search');
const btnRest = document.getElementById('btn-rest');
const btnPickup = document.getElementById('btn-pickup');
const btnDiscard = document.getElementById('btn-discard');
const btnOpenMap = document.getElementById('btn-open-map');
const btnCloseMap = document.getElementById('btn-close-map');

function logMessage(text, type = 'sys-msg') {
  const entry = document.createElement('div');
  entry.className = `log-entry ${type}`;
  entry.innerText = text;
  combatLog.appendChild(entry);
  combatLog.scrollTop = combatLog.scrollHeight;
}

function getAvailableRecipes() {
  const inv = player.inventory.filter(Boolean);
  const available = [];

  GAME_DATA.recipes.forEach(recipe => {
    const [mat1, mat2] = recipe.materials;
    let hasMat1 = false;
    let hasMat2 = false;

    if (mat1 === mat2) {
      hasMat1 = inv.filter(id => id === mat1).length >= 2;
      hasMat2 = hasMat1;
    } else {
      hasMat1 = inv.includes(mat1);
      hasMat2 = inv.includes(mat2);
    }

    if (hasMat1 && hasMat2) {
      available.push({
        ...recipe,
        resultName: GAME_DATA.items[recipe.result]?.name || recipe.result
      });
    }
  });

  return available;
}

function updateUI() {
  hudName.innerText = player.name;
  hudLevel.innerText = `Lv.${player.level}`;

  const hpPct = Math.max(0, (player.hp / player.maxHp) * 100);
  const spPct = Math.max(0, (player.sp / player.maxSp) * 100);

  hpBar.style.width = `${hpPct}%`;
  hpText.innerText = `${player.hp} / ${player.maxHp}`;
  spBar.style.width = `${spPct}%`;
  spText.innerText = `${player.sp} / ${player.maxSp}`;

  // 渲染背包 6 格
  inventoryGrid.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const slot = document.createElement('div');
    const itemId = player.inventory[i];
    slot.className = `inv-slot ${itemId ? 'occupied' : ''}`;

    if (itemId && GAME_DATA.items[itemId]) {
      const it = GAME_DATA.items[itemId];
      let tagText = '';
      if (it.type === 'weapon') tagText = `攻+${it.atk}`;
      else if (it.type === 'armor') tagText = `防+${it.def}`;
      else if (it.heal_hp) tagText = `+${it.heal_hp}HP`;
      else if (it.heal_sp) tagText = `+${it.heal_sp}SP`;
      else tagText = '素材';

      slot.innerHTML = `<strong>${it.name}</strong><span class="slot-tag">${tagText}</span>`;
      slot.onclick = () => openItemModal(i);
    } else {
      slot.innerHTML = `<span style="color:#475569; font-size:0.7rem;">[${i+1}]</span>`;
    }
    inventoryGrid.appendChild(slot);
  }

  // 渲染合成
  const available = getAvailableRecipes();
  recipeList.innerHTML = '';
  if (available.length === 0) {
    recipeList.innerHTML = '<div class="no-recipe">背包內無可合成組合</div>';
  } else {
    available.forEach(r => {
      const chip = document.createElement('div');
      chip.className = 'recipe-chip';
      chip.innerHTML = `<span>🔨</span> <span>${r.resultName}</span>`;
      chip.onclick = () => craftItem(r.result);
      recipeList.appendChild(chip);
    });
  }

  // 渲染場景
  const curArea = GAME_DATA.areas.find(a => a.id === player.area);
  if (curArea) {
    areaTitle.innerText = curArea.name;
    areaDesc.innerText = curArea.desc;
  }
}

// 開啟物品操作彈窗 (使用/裝備/丟棄)
function openItemModal(slotIdx) {
  const itemId = player.inventory[slotIdx];
  if (!itemId) return;

  const it = GAME_DATA.items[itemId];
  selectedSlotIdx = slotIdx;

  itemModalTitle.innerText = it.name;
  itemModalDesc.innerText = it.desc;

  if (it.type === 'material') {
    btnModalUse.style.display = 'none'; // 素材無法使用
  } else {
    btnModalUse.style.display = 'block';
    btnModalUse.innerText = it.type === 'consumable' ? '使用 (恢復)' : '裝備上陣';
  }

  itemModal.classList.remove('hidden');
}

function closeItemModal() {
  selectedSlotIdx = null;
  itemModal.classList.add('hidden');
}

btnModalCancel.onclick = closeItemModal;

// 丟棄物品
btnModalDrop.onclick = () => {
  if (selectedSlotIdx !== null) {
    const itemId = player.inventory[selectedSlotIdx];
    const it = GAME_DATA.items[itemId];
    player.inventory[selectedSlotIdx] = null;
    logMessage(`丟棄了 [${it.name}]，清出了背包空間。`, 'warn-msg');
    closeItemModal();
    updateUI();
  }
};

// 使用/裝備
btnModalUse.onclick = () => {
  if (selectedSlotIdx !== null) {
    const slot = selectedSlotIdx;
    closeItemModal();
    useOrEquip(slot);
  }
};

// 探索
function doSearch() {
  if (player.sp < 5) {
    logMessage('精力不足（需 5 SP），請點擊「休息」或飲用飲料！', 'warn-msg');
    return;
  }

  player.sp = Math.max(0, player.sp - 5);
  const curArea = GAME_DATA.areas.find(a => a.id === player.area);
  const foundId = curArea.items[Math.floor(Math.random() * curArea.items.length)];
  const itemData = GAME_DATA.items[foundId];

  pendingFoundItem = { id: foundId, ...itemData };
  discItemName.innerText = itemData.name;
  discItemDesc.innerText = itemData.desc;
  discoveryCard.classList.remove('hidden');

  logMessage(`探索發現了 [${itemData.name}]！`, 'gain-msg');
  updateUI();
}

// 拾取
function doPickup() {
  if (!pendingFoundItem) return;

  const emptyIdx = player.inventory.findIndex(s => s === null);
  if (emptyIdx === -1) {
    logMessage('背包已滿（最多 6 格），無法拾取！請先點擊背包物品進行丟棄。', 'warn-msg');
    return;
  }

  player.inventory[emptyIdx] = pendingFoundItem.id;
  logMessage(`將 [${pendingFoundItem.name}] 收入背包第 ${emptyIdx + 1} 格。`, 'sys-msg');
  pendingFoundItem = null;
  discoveryCard.classList.add('hidden');
  updateUI();
}

function doDiscard() {
  if (pendingFoundItem) {
    logMessage(`無視了 [${pendingFoundItem.name}]。`, 'sys-msg');
    pendingFoundItem = null;
    discoveryCard.classList.add('hidden');
  }
}

// 使用或裝備
function useOrEquip(slotIdx) {
  const itemId = player.inventory[slotIdx];
  if (!itemId) return;

  const it = GAME_DATA.items[itemId];
  if (it.type === 'consumable') {
    if (it.heal_hp) player.hp = Math.min(player.maxHp, player.hp + it.heal_hp);
    if (it.heal_sp) player.sp = Math.min(player.maxSp, player.sp + it.heal_sp);
    player.inventory[slotIdx] = null;
    logMessage(`使用了 [${it.name}]，恢復了狀態。`, 'gain-msg');
  } else if (it.type === 'weapon') {
    const old = player.equipment.weapon;
    player.equipment.weapon = itemId;
    player.inventory[slotIdx] = old;
    logMessage(`裝備了武器：[${it.name}] (攻擊力 +${it.atk})！`, 'gain-msg');
  } else if (it.type === 'armor') {
    const old = player.equipment.arm;
    player.equipment.arm = itemId;
    player.inventory[slotIdx] = old;
    logMessage(`裝備了防具：[${it.name}] (防禦力 +${it.def})！`, 'gain-msg');
  }
  updateUI();
}

// 合成
function craftItem(resultId) {
  const recipe = GAME_DATA.recipes.find(r => r.result === resultId);
  if (!recipe) return;

  const [mat1, mat2] = recipe.materials;
  const idx1 = player.inventory.indexOf(mat1);
  if (idx1 === -1) return;

  player.inventory[idx1] = null;
  const idx2 = player.inventory.indexOf(mat2);
  if (idx2 === -1) {
    player.inventory[idx1] = mat1;
    return;
  }
  player.inventory[idx2] = null;

  const freeIdx = player.inventory.indexOf(null);
  player.inventory[freeIdx] = resultId;

  player.exp += 25;
  if (player.exp >= player.level * 50) {
    player.level += 1;
    player.maxHp += 15;
    player.hp += 15;
    player.maxSp += 10;
    logMessage(`等級提升至 Lv.${player.level}！體質全面上升！`, 'craft-msg');
  }

  const resName = GAME_DATA.items[resultId].name;
  logMessage(`成功打造出：[${resName}]！`, 'craft-msg');
  updateUI();
}

// 休息
function doRest() {
  player.hp = Math.min(player.maxHp, player.hp + 20);
  player.sp = Math.min(player.maxSp, player.sp + 20);
  logMessage('在安全掩體休息調息 (+20 HP, +20 SP)。', 'gain-msg');
  updateUI();
}

// 地圖移動
btnOpenMap.onclick = () => {
  areaSelector.innerHTML = '';
  GAME_DATA.areas.forEach(a => {
    const btn = document.createElement('button');
    btn.className = 'area-choice-btn';
    btn.innerText = a.name;
    btn.onclick = () => {
      if (player.sp < 3) {
        logMessage('精力不足無法移動（需 3 SP）', 'warn-msg');
        return;
      }
      player.sp -= 3;
      player.area = a.id;
      mapModal.classList.add('hidden');
      discoveryCard.classList.add('hidden');
      pendingFoundItem = null;
      logMessage(`已移動至新區域：[${a.name}]。`, 'sys-msg');
      updateUI();
    };
    areaSelector.appendChild(btn);
  });
  mapModal.classList.remove('hidden');
};

btnCloseMap.onclick = () => mapModal.classList.add('hidden');
btnSearch.onclick = doSearch;
btnPickup.onclick = doPickup;
btnDiscard.onclick = doDiscard;
btnRest.onclick = doRest;

// 鍵盤快速鍵
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!itemModal.classList.contains('hidden')) {
      closeItemModal();
      return;
    }
    if (!mapModal.classList.contains('hidden')) {
      mapModal.classList.add('hidden');
      return;
    }
    if (!discoveryCard.classList.contains('hidden')) {
      doDiscard();
      return;
    }
  }

  if (!discoveryCard.classList.contains('hidden')) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      doPickup();
      return;
    }
  }

  if (e.key === ' ' || e.key.toLowerCase() === 's') {
    e.preventDefault();
    doSearch();
    return;
  }

  if (e.key.toLowerCase() === 'r') {
    doRest();
    return;
  }

  if (e.key.toLowerCase() === 'm') {
    btnOpenMap.click();
    return;
  }

  if (e.key >= '1' && e.key <= '6') {
    openItemModal(parseInt(e.key) - 1);
    return;
  }

  if (e.key.toLowerCase() === 'c') {
    const firstChip = recipeList.querySelector('.recipe-chip');
    if (firstChip) firstChip.click();
    return;
  }
});

updateUI();
logMessage('歡迎來到 Project Lumia 試驗場，點擊背包物品可選擇「使用/裝備/丟棄」。');
