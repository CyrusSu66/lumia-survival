// ==================== 基礎遊戲資料庫 ====================
const GAME_DATA = {
  areas: [
    {
      id: "school",
      name: "學校",
      desc: "荒廢的教學大樓，散落著文具、布料與急救物資",
      items: ["branch", "bandage", "lighter", "pen", "water", "cloth"],
      wild: { name: "變異烏鴉", hp: 45, maxHp: 45, atk: 13, def: 3, exp: 20, drop: ["feather", "herb"] }
    },
    {
      id: "hospital",
      name: "醫院",
      desc: "充滿消毒水氣味的診所，有豐富的醫療藥品與銳器",
      items: ["bandage", "scalpel", "pills", "needle", "water", "alcohol"],
      wild: { name: "狂暴實驗犬", hp: 65, maxHp: 65, atk: 18, def: 6, exp: 30, drop: ["leather", "bandage"] }
    },
    {
      id: "factory",
      name: "工廠",
      desc: "廢棄重工業區，能找到各類金屬零件、鐵絲與工具",
      items: ["scrap_metal", "hammer", "iron_ore", "wire", "oil", "cloth"],
      wild: { name: "巡邏機械犬", hp: 80, maxHp: 80, atk: 22, def: 10, exp: 40, drop: ["scrap_metal", "steel"] }
    },
    {
      id: "forest",
      name: "森林",
      desc: "島嶼中央的繁茂樹林，適合採集天然素材、毛皮與草藥",
      items: ["branch", "stone", "herb", "flower", "water", "leather"],
      wild: { name: "叢林山豬", hp: 90, maxHp: 90, atk: 24, def: 12, exp: 45, drop: ["meat", "leather"] }
    },
    {
      id: "beach",
      name: "海灘",
      desc: "被海浪沖刷的海岸線，有龜殼、海魚與漂流廢鐵",
      items: ["scrap_metal", "stone", "water", "turtle_shell", "fish", "lighter"],
      wild: { name: "巨型寄居蟹", hp: 75, maxHp: 75, atk: 19, def: 16, exp: 35, drop: ["turtle_shell", "fish"] }
    }
  ],

  items: {
    // 基礎材料與採集物
    branch: { name: "樹枝", type: "material", desc: "隨處可見的堅韌樹枝" },
    stone: { name: "石頭", type: "material", desc: "硬質鵝卵石，可打磨或加固" },
    lighter: { name: "打火機", type: "material", desc: "可以生火、煮水或烘烤食物" },
    scrap_metal: { name: "廢鐵", type: "material", desc: "粗糙的鐵塊組件" },
    iron_ore: { name: "鐵礦石", type: "material", desc: "純淨的鐵礦，可與廢鐵精煉成鋼鐵" },
    turtle_shell: { name: "龜殼", type: "material", desc: "硬實的甲殼防禦素材" },
    pen: { name: "鋼筆", type: " weapon", subType: "blade", atk: 8, desc: "金屬筆尖的鋼筆 (+8 攻擊)" },
    needle: { name: "縫合針", type: "material", desc: "醫療用尖銳長針" },
    wire: { name: "鐵絲", type: "material", desc: "高韌性工業金屬線" },
    oil: { name: "機油", type: "material", desc: "易燃工業潤滑油" },
    flower: { name: "山茶花", type: "material", desc: "具有鎮靜功效的野生花朵" },
    cloth: { name: "布料", type: "material", desc: "厚實的帆布衣料" },
    leather: { name: "皮革", type: "material", desc: "堅韌的動物毛皮" },
    feather: { name: "鴉羽", type: "material", desc: "輕盈的黑色羽翎" },
    alcohol: { name: "高濃度酒精", type: "material", desc: "醫療消毒與燃燒溶劑" },

    // 基礎消耗品
    bandage: { name: "繃帶", type: "consumable", heal_hp: 22, desc: "乾淨的布條，回復 22 HP" },
    pills: { name: "止痛藥", type: "consumable", heal_hp: 35, desc: "強效止痛藥，回復 35 HP" },
    water: { name: "生水", type: "consumable", heal_sp: 25, desc: "甘甜的清水，回復 25 SP" },
    herb: { name: "草藥", type: "consumable", heal_hp: 18, desc: "清涼草藥，回復 18 HP" },
    fish: { name: "生鮮海魚", type: "consumable", heal_hp: 15, desc: "剛捕獲的海魚，直接吃回復 15 HP，烤熟效果極佳" },
    meat: { name: "生獸肉", type: "consumable", heal_hp: 20, desc: "新鮮野獸肉，烤熟後可大幅恢復體力" },

    // 基礎武器与防具
    hammer: { name: "鐵鎚", type: "weapon", subType: "blunt", atk: 13, desc: "工業重鐵鎚 (+13 攻擊)" },
    scalpel: { name: "手術刀", type: "weapon", subType: "blade", atk: 15, desc: "鋒利的外科手術刀 (+15 攻擊)" },

    // 合成中階材料與進階補給
    steel: { name: "鋼鐵", type: "material", desc: "由廢鐵與鐵礦精煉的高硬度鋼材" },
    boiled_water: { name: "熱水", type: "consumable", heal_sp: 45, desc: "剛煮沸的熱水 (+45 SP)" },
    herbal_tea: { name: "草本茶", type: "consumable", heal_sp: 70, heal_hp: 20, desc: "舒緩身心的草藥茶 (+70 SP, +20 HP)" },
    flower_tea: { name: "山茶花露", type: "consumable", heal_sp: 55, heal_hp: 40, desc: "芬芳提神的花茶 (+55 SP, +40 HP)" },
    first_aid_kit: { name: "急救包", type: "consumable", heal_hp: 75, desc: "專業戰地醫療包 (+75 HP)" },
    grilled_fish: { name: "炭烤海魚", type: "consumable", heal_hp: 60, heal_sp: 20, desc: "香氣四溢的烤魚 (+60 HP, +20 SP)" },
    steak: { name: "炙烤肉排", type: "consumable", heal_hp: 85, heal_sp: 25, desc: "頂級炙烤獸肉排 (+85 HP, +25 SP)" },
    med_alcohol: { name: "戰地止血劑", type: "consumable", heal_hp: 55, heal_sp: 15, desc: "酒精消毒強效繃帶 (+55 HP, +15 SP)" },

    // 合成武器
    poison_scalpel: { name: "精密刺針刀", type: "weapon", subType: "blade", atk: 26, desc: "結合縫合針改造的暗殺刀 (+26 攻擊)" },
    spiked_club: { name: "狼牙木棒", type: "weapon", subType: "blunt", atk: 24, desc: "纏繞鐵絲與尖針的木棒 (+24 攻擊)" },
    war_hammer: { name: "戰鎚", type: "weapon", subType: "blunt", atk: 34, desc: "沉重且致命的鋼製重錘 (+34 攻擊)" },
    steel_blade: { name: "精鋼短刀", type: "weapon", subType: "blade", atk: 38, desc: "冷光凜冽的鍛造短刀 (+38 攻擊)" },
    flame_blade: { name: "烈焰魔劍", type: "weapon", subType: "blade", atk: 54, desc: "塗滿燃油並點火的致命傳奇長刃 (+54 攻擊)" },
    thor_hammer: { name: "雷霆粉碎鎚", type: "weapon", subType: "blunt", atk: 52, desc: "纏繞高壓電線的重型戰鎚 (+52 攻擊)" },

    // 合成防具 (身體 body / 臂甲 arm)
    leather_vest: { name: "獵人皮衣", type: "armor", subType: "body", def: 14, desc: "縫合布料與皮革的防具 (+14 防禦)" },
    chain_armor: { name: "鋼鐵鎖子甲", type: "armor", subType: "body", def: 28, desc: "以鋼鐵與鐵絲編織的重甲 (+28 防禦)" },
    combat_suit: { name: "特種防彈衣", type: "armor", subType: "body", def: 32, desc: "皮革強化鋼板的頂級戰術護甲 (+32 防禦)" },
    turtle_shield: { name: "龜甲盾", type: "armor", subType: "arm", def: 22, desc: "防護力極佳的龜殼鋼盾 (+22 防禦)" },
    spiked_shield: { name: "荊棘臂盾", type: "armor", subType: "arm", def: 30, desc: "鑲嵌鐵絲尖刺的合金重盾 (+30 防禦)" }
  },

  recipes: [
    // 飲品與食物
    { result: "boiled_water", materials: ["water", "lighter"] },
    { result: "herbal_tea", materials: ["boiled_water", "herb"] },
    { result: "flower_tea", materials: ["boiled_water", "flower"] },
    { result: "first_aid_kit", materials: ["bandage", "pills"] },
    { result: "med_alcohol", materials: ["bandage", "alcohol"] },
    { result: "grilled_fish", materials: ["fish", "lighter"] },
    { result: "steak", materials: ["meat", "lighter"] },

    // 基礎與中階合成素材/武器
    { result: "steel", materials: ["scrap_metal", "iron_ore"] },
    { result: "poison_scalpel", materials: ["scalpel", "needle"] },
    { result: "spiked_club", materials: ["branch", "wire"] },
    { result: "war_hammer", materials: ["hammer", "steel"] },
    { result: "steel_blade", materials: ["scalpel", "steel"] },

    // 頂級傳奇武器 (三階合成)
    { result: "flame_blade", materials: ["steel_blade", "oil"] },
    { result: "thor_hammer", materials: ["war_hammer", "wire"] },

    // 防具合成
    { result: "leather_vest", materials: ["cloth", "leather"] },
    { result: "chain_armor", materials: ["steel", "wire"] },
    { result: "combat_suit", materials: ["leather_vest", "steel"] },
    { result: "turtle_shield", materials: ["turtle_shell", "steel"] },
    { result: "spiked_shield", materials: ["turtle_shield", "wire"] }
  ]
};

// Fix minor typo in pen type if any
GAME_DATA.items.pen.type = "weapon";

// AI 受試者名單
const AI_ROSTER = [
  { name: "06M-RF18 傑琪", weapon: "雙刀", atk: 15, def: 6 },
  { name: "14M-RFT02 阿雅", weapon: "左輪手槍", atk: 16, def: 5 },
  { name: "14M-RFT04 玄佑", weapon: "皮手套", atk: 14, def: 8 },
  { name: "14M-RFT03 菲歐拉", weapon: "西洋劍", atk: 16, def: 6 },
  { name: "14M-RFT07 娜汀", weapon: "獵弓", atk: 15, def: 5 },
  { name: "15M-RFT16 雪", weapon: "太刀", atk: 16, def: 7 },
  { name: "14M-RFT10 羅薩里奧", weapon: "球棒", atk: 17, def: 6 },
  { name: "15M-RFT18 席瑟拉", weapon: "暗器", atk: 14, def: 5 },
  { name: "14M-RFT06 馬格努斯", weapon: "鐵管", atk: 15, def: 9 }
];

// ==================== 遊戲狀態變數 ====================
let player = null;
let aiBots = [];
let restrictedAreas = new Set();
let warningAreas = new Set();
let actionCounter = 0;
const ACTIONS_PER_PHASE = 12;

let pendingFoundItem = null;
let activeEnemy = null; // 當前遭遇的野怪或 AI
let selectedSlotIdx = null;
let currentCodexTab = "all";
let isGameOver = false;

// DOM 快取
const hudName = document.getElementById('hud-name');
const hudLevel = document.getElementById('hud-level');
const btnStance = document.getElementById('btn-stance');
const hudAlive = document.getElementById('hud-alive');
const hudZoneTimer = document.getElementById('hud-zone-timer');
const hpBar = document.getElementById('hp-bar');
const hpText = document.getElementById('hp-text');
const spBar = document.getElementById('sp-bar');
const spText = document.getElementById('sp-text');
const hudAtk = document.getElementById('hud-atk');
const hudDef = document.getElementById('hud-def');
const hudMastery = document.getElementById('hud-mastery');
const eqWeapon = document.getElementById('eq-weapon');
const eqBody = document.getElementById('eq-body');
const eqArm = document.getElementById('eq-arm');

const areaBanner = document.getElementById('area-banner');
const areaTitle = document.getElementById('area-title');
const areaZoneTag = document.getElementById('area-zone-tag');
const areaDesc = document.getElementById('area-desc');
const areaDropsHint = document.getElementById('area-drops-hint');
const combatLog = document.getElementById('combat-log');
const inventoryGrid = document.getElementById('inventory-grid');
const recipeList = document.getElementById('recipe-list');

const discoveryCard = document.getElementById('discovery-card');
const discItemName = document.getElementById('disc-item-name');
const discItemDesc = document.getElementById('disc-item-desc');

const combatCard = document.getElementById('combat-card');
const enemyTag = document.getElementById('enemy-tag');
const enemyStats = document.getElementById('enemy-stats');
const enemyName = document.getElementById('enemy-name');
const enemyHpText = document.getElementById('enemy-hp-text');
const enemyHpBar = document.getElementById('enemy-hp-bar');
const combatRoundDesc = document.getElementById('combat-round-desc');

const itemModal = document.getElementById('item-modal');
const itemModalTitle = document.getElementById('item-modal-title');
const itemModalDesc = document.getElementById('item-modal-desc');
const itemModalRecipes = document.getElementById('item-modal-recipes');
const btnModalUse = document.getElementById('btn-modal-use');
const btnModalDrop = document.getElementById('btn-modal-drop');
const btnModalCancel = document.getElementById('btn-modal-cancel');

const mapModal = document.getElementById('map-modal');
const areaSelector = document.getElementById('area-selector');

const codexModal = document.getElementById('codex-modal');
const codexList = document.getElementById('codex-list');
const btnOpenCodex = document.getElementById('btn-open-codex');
const btnCloseCodex = document.getElementById('btn-close-codex');

const gameoverModal = document.getElementById('gameover-modal');
const gameoverTitle = document.getElementById('gameover-title');
const gameoverDesc = document.getElementById('gameover-desc');
const gameoverStats = document.getElementById('gameover-stats');
const btnRestart = document.getElementById('btn-restart');

const btnSearch = document.getElementById('btn-search');
const btnRest = document.getElementById('btn-rest');
const btnPickup = document.getElementById('btn-pickup');
const btnDiscard = document.getElementById('btn-discard');
const btnAttack = document.getElementById('btn-attack');
const btnFlee = document.getElementById('btn-flee');
const btnOpenMap = document.getElementById('btn-open-map');
const btnCloseMap = document.getElementById('btn-close-map');

// ==================== 初始化與重置遊戲 ====================
function initGame() {
  isGameOver = false;
  actionCounter = 0;
  restrictedAreas.clear();
  warningAreas.clear();
  pendingFoundItem = null;
  activeEnemy = null;
  selectedSlotIdx = null;

  player = {
    name: "受試者 #01",
    hp: 100,
    maxHp: 100,
    sp: 80,
    maxSp: 80,
    baseAtk: 12,
    baseDef: 5,
    level: 1,
    exp: 0,
    masteryExp: 0,
    kills: 0,
    crafts: 0,
    stance: "normal", // normal, aggressive, stealth
    area: "school",
    equipment: { weapon: null, body: null, arm: null },
    inventory: ["water", "bandage", null, null, null, null]
  };

  // 建立 9 名 AI 對手
  aiBots = AI_ROSTER.map((tpl, idx) => {
    const randomArea = GAME_DATA.areas[idx % GAME_DATA.areas.length].id;
    return {
      id: `ai_${idx}`,
      name: tpl.name,
      weaponName: tpl.weapon,
      hp: 95,
      maxHp: 95,
      atk: tpl.atk,
      def: tpl.def,
      area: randomArea,
      alive: true
    };
  });

  // 預設第一波預告禁區 (海灘)
  warningAreas.add("beach");

  combatLog.innerHTML = '';
  discoveryCard.classList.add('hidden');
  combatCard.classList.add('hidden');
  gameoverModal.classList.add('hidden');

  logMessage('📢 [亞格萊雅廣播] 盧米亞島生存實驗正式開始！共 10 名受試者參戰。', 'sys-msg');
  logMessage('⚠️ 第一階段禁區預告：[海灘] 將於 12 次行動後封鎖！', 'warn-msg');
  updateUI();
}

// ==================== 輔助計算函式 ====================
function getPlayerAtk() {
  let atk = player.baseAtk + Math.floor(player.masteryExp / 25) * 3;
  if (player.equipment.weapon && GAME_DATA.items[player.equipment.weapon]) {
    atk += GAME_DATA.items[player.equipment.weapon].atk || 0;
  }
  if (player.stance === "aggressive") {
    atk = Math.round(atk * 1.15);
  }
  return atk;
}

function getPlayerDef() {
  let def = player.baseDef;
  if (player.equipment.body && GAME_DATA.items[player.equipment.body]) {
    def += GAME_DATA.items[player.equipment.body].def || 0;
  }
  if (player.equipment.arm && GAME_DATA.items[player.equipment.arm]) {
    def += GAME_DATA.items[player.equipment.arm].def || 0;
  }
  if (player.stance === "aggressive") {
    def = Math.max(0, Math.round(def * 0.85));
  }
  return def;
}

function getMasteryLabel() {
  const ranks = ["F", "E", "D", "C", "B", "A", "S", "SS"];
  const idx = Math.min(ranks.length - 1, Math.floor(player.masteryExp / 25));
  const pct = (player.masteryExp % 25) * 4;
  return `熟練 ${ranks[idx]} (${pct}%)`;
}

function getAliveCount() {
  return 1 + aiBots.filter(b => b.alive).length;
}

function findItemDropAreas(itemId) {
  const list = [];
  GAME_DATA.areas.forEach(a => {
    if (a.items.includes(itemId)) list.push(a.name);
    if (a.wild && a.wild.drop.includes(itemId)) list.push(`${a.name}(野怪)`);
  });
  return list;
}

// ==================== 介面渲染 ====================
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
  hudAlive.innerText = `👤 ${getAliveCount()}/10`;
  const remain = ACTIONS_PER_PHASE - (actionCounter % ACTIONS_PER_PHASE);
  hudZoneTimer.innerText = `⏱️ ${remain} 動`;

  // 姿態顯示
  btnStance.className = 'stance-badge';
  if (player.stance === 'aggressive') {
    btnStance.classList.add('stance-aggressive');
    btnStance.innerText = '⚔️ 進攻姿態';
  } else if (player.stance === 'stealth') {
    btnStance.classList.add('stance-stealth');
    btnStance.innerText = '🥷 潛行姿態';
  } else {
    btnStance.innerText = '⚖️ 均衡姿態';
  }

  // HP & SP
  const hpPct = Math.max(0, (player.hp / player.maxHp) * 100);
  const spPct = Math.max(0, (player.sp / player.maxSp) * 100);
  hpBar.style.width = `${hpPct}%`;
  hpText.innerText = `HP ${player.hp} / ${player.maxHp}`;
  spBar.style.width = `${spPct}%`;
  spText.innerText = `SP ${player.sp} / ${player.maxSp}`;

  // 攻防與已穿戴裝備
  hudAtk.innerText = getPlayerAtk();
  hudDef.innerText = getPlayerDef();
  hudMastery.innerText = getMasteryLabel();

  const wItem = player.equipment.weapon ? GAME_DATA.items[player.equipment.weapon] : null;
  eqWeapon.className = `eq-slot ${wItem ? 'active-eq' : ''}`;
  eqWeapon.innerHTML = `🗡️ <span>${wItem ? `${wItem.name} (+${wItem.atk})` : '空手'}</span>`;

  const bItem = player.equipment.body ? GAME_DATA.items[player.equipment.body] : null;
  eqBody.className = `eq-slot ${bItem ? 'active-eq' : ''}`;
  eqBody.innerHTML = `👕 <span>${bItem ? `${bItem.name} (+${bItem.def})` : '無衣服'}</span>`;

  const aItem = player.equipment.arm ? GAME_DATA.items[player.equipment.arm] : null;
  eqArm.className = `eq-slot ${aItem ? 'active-eq' : ''}`;
  eqArm.innerHTML = `🛡️ <span>${aItem ? `${aItem.name} (+${aItem.def})` : '無臂甲'}</span>`;

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
    recipeList.innerHTML = '<div class="no-recipe">湊齊材料自動浮現（可點右上「📖 配方圖鑑」查詢）</div>';
  } else {
    available.forEach(r => {
      const resItem = GAME_DATA.items[r.result];
      let statHint = '';
      if (resItem.atk) statHint = `(攻+${resItem.atk})`;
      else if (resItem.def) statHint = `(防+${resItem.def})`;
      else if (resItem.heal_hp) statHint = `(+${resItem.heal_hp}HP)`;
      else if (resItem.heal_sp) statHint = `(+${resItem.heal_sp}SP)`;

      const chip = document.createElement('div');
      chip.className = 'recipe-chip';
      chip.innerHTML = `<span>🔨</span> <span>${r.resultName} ${statHint}</span>`;
      chip.onclick = () => craftItem(r.result);
      recipeList.appendChild(chip);
    });
  }

  // 渲染當前場景資訊
  const curArea = GAME_DATA.areas.find(a => a.id === player.area);
  if (curArea) {
    areaTitle.innerText = curArea.name;
    areaDesc.innerText = curArea.desc;

    areaBanner.classList.remove('zone-warning-bg', 'zone-restricted-bg');
    if (restrictedAreas.has(curArea.id)) {
      areaZoneTag.className = 'zone-tag restricted';
      areaZoneTag.innerText = '🚫 禁區封鎖 (手環電擊)';
      areaBanner.classList.add('zone-restricted-bg');
    } else if (warningAreas.has(curArea.id)) {
      areaZoneTag.className = 'zone-tag warning';
      areaZoneTag.innerText = '⚠️ 預告禁區';
      areaBanner.classList.add('zone-warning-bg');
    } else {
      areaZoneTag.className = 'zone-tag safe';
      areaZoneTag.innerText = '安全區';
    }

    const dropNames = curArea.items.map(id => GAME_DATA.items[id]?.name || id).join('、');
    const aiHere = aiBots.filter(b => b.alive && b.area === curArea.id).length;
    areaDropsHint.innerHTML = `📦 <strong>區域物資</strong>：${dropNames}<br>🐾 <strong>野生生物</strong>：${curArea.wild.name} ｜ 📡 <strong>生命反應</strong>：${aiHere > 0 ? `<span style="color:#f87171;font-weight:bold;">偵測到 ${aiHere} 名受試者！</span>` : '周遭無其他受試者'}`;
  }
}

// ==================== 世界時間推進與 AI 模擬 ====================
function advanceWorldTick() {
  if (isGameOver) return;
  actionCounter++;

  // 若玩家滯留於已封鎖禁區，扣除手環電擊傷害
  if (restrictedAreas.has(player.area)) {
    player.hp = Math.max(0, player.hp - 25);
    logMessage('⚡ 警告！你滯留在已封鎖禁區，手環釋放高壓電流 (-25 HP)！請立即移動！', 'warn-msg');
    if (player.hp <= 0) {
      triggerGameOver(false, '滯留禁區過久，遭生命監控手環引爆淘汰。');
      return;
    }
  }

  // AI 行動模擬 (移動、強化、AI 互砍)
  const safeAreaIds = GAME_DATA.areas.map(a => a.id).filter(id => !restrictedAreas.has(id));
  aiBots.forEach(bot => {
    if (!bot.alive) return;

    // 若 AI 在禁區或預告禁區，優先逃往安全區
    if ((restrictedAreas.has(bot.area) || warningAreas.has(bot.area)) && safeAreaIds.length > 0) {
      bot.area = safeAreaIds[Math.floor(Math.random() * safeAreaIds.length)];
    } else if (Math.random() < 0.35 && safeAreaIds.length > 0) {
      bot.area = safeAreaIds[Math.floor(Math.random() * safeAreaIds.length)];
    }

    // AI 隨時間微幅強化裝備數值
    if (actionCounter % 5 === 0) {
      bot.atk += 2;
      bot.def += 1;
      bot.maxHp += 5;
      bot.hp = Math.min(bot.maxHp, bot.hp + 10);
    }
  });

  // 模擬 AI 之間遭遇交戰 (每幾動有機率發生 AI 互殺)
  const aliveBots = aiBots.filter(b => b.alive);
  if (aliveBots.length >= 2 && Math.random() < 0.28) {
    const attacker = aliveBots[Math.floor(Math.random() * aliveBots.length)];
    const others = aliveBots.filter(b => b.id !== attacker.id && (b.area === attacker.area || Math.random() < 0.35));
    if (others.length > 0) {
      const victim = others[Math.floor(Math.random() * others.length)];
      const dmg = Math.max(12, attacker.atk - Math.floor(victim.def * 0.5));
      victim.hp -= dmg;
      if (victim.hp <= 0) {
        victim.alive = false;
        const areaName = GAME_DATA.areas.find(a => a.id === victim.area)?.name || '未知區域';
        logMessage(`💀 [擊殺廣播] ${attacker.name} 在 [${areaName}] 擊殺了 ${victim.name}！(剩餘 ${getAliveCount()} 人)`, 'combat-msg');
        checkVictory();
      }
    }
  }

  // 禁區階段推進
  if (actionCounter % ACTIONS_PER_PHASE === 0) {
    // 預告禁區轉為正式禁區
    warningAreas.forEach(aId => {
      restrictedAreas.add(aId);
      const aName = GAME_DATA.areas.find(a => a.id === aId)?.name;
      logMessage(`🚫 [禁區封鎖] [${aName}] 已正式封鎖！停留將遭受手環電擊！`, 'warn-msg');
    });
    warningAreas.clear();

    // 挑選下一個預告禁區（保留至少 1 個最終決戰安全區）
    const remainingSafe = GAME_DATA.areas.map(a => a.id).filter(id => !restrictedAreas.has(id));
    if (remainingSafe.length > 1) {
      const nextWarn = remainingSafe[Math.floor(Math.random() * remainingSafe.length)];
      warningAreas.add(nextWarn);
      const nextName = GAME_DATA.areas.find(a => a.id === nextWarn)?.name;
      logMessage(`⚠️ [禁區預告] 下一個封鎖區域為：[${nextName}] (${ACTIONS_PER_PHASE} 動後封鎖)`, 'warn-msg');
    } else if (remainingSafe.length === 1) {
      const finalName = GAME_DATA.areas.find(a => a.id === remainingSafe[0])?.name;
      logMessage(`🔥 [最終決戰] 全島僅剩 [${finalName}] 為安全區，請擊敗所有殘存受試者！`, 'combat-msg');
    }
  }
}

function checkVictory() {
  if (isGameOver) return false;
  if (getAliveCount() <= 1 && player.hp > 0) {
    triggerGameOver(true, '恭喜！所有競爭受試者皆已淘汰，你成為盧米亞島最終唯一倖存者！');
    return true;
  }
  return false;
}

function triggerGameOver(isWin, reasonText) {
  isGameOver = true;
  const rank = isWin ? 1 : getAliveCount();
  gameoverTitle.innerText = isWin ? '🏆 唯一倖存者 (第 1 名)！' : `💀 實驗淘汰 (第 ${rank} 名 / 10 人)`;
  gameoverTitle.style.color = isWin ? '#facc15' : '#ef4444';
  gameoverDesc.innerText = reasonText;

  const wName = player.equipment.weapon ? GAME_DATA.items[player.equipment.weapon].name : '空手';
  const bName = player.equipment.body ? GAME_DATA.items[player.equipment.body].name : '無';
  const aName = player.equipment.arm ? GAME_DATA.items[player.equipment.arm].name : '無';

  gameoverStats.innerHTML = `
    <div>🎖️ <strong>最終排名</strong>：第 ${rank} 名 / 10 人</div>
    <div>⚔️ <strong>擊殺紀錄</strong>：${player.kills} 次擊殺 ｜ <strong>等級</strong>：Lv.${player.level} (${getMasteryLabel()})</div>
    <div>🔨 <strong>合成次數</strong>：${player.crafts} 次 ｜ <strong>總行動數</strong>：${actionCounter} 動</div>
    <div>🛡️ <strong>最終裝備</strong>：${wName} / ${bName} / ${aName}</div>
  `;
  gameoverModal.classList.remove('hidden');
}

// ==================== 探索與遭遇戰鬥 ====================
function doSearch() {
  if (isGameOver) return;
  if (activeEnemy) {
    logMessage('⚠️ 正在遭遇敵襲！請先選擇「揮擊交戰」或「撤退」！', 'warn-msg');
    return;
  }
  if (player.sp < 5) {
    logMessage('精力不足（需 5 SP），請點擊「休息」或飲用飲料！', 'warn-msg');
    return;
  }

  player.sp = Math.max(0, player.sp - 5);
  discoveryCard.classList.add('hidden');
  pendingFoundItem = null;

  const curArea = GAME_DATA.areas.find(a => a.id === player.area);
  const aiInArea = aiBots.filter(b => b.alive && b.area === player.area);

  // 依據姿態計算遇敵機率
  let combatChance = 0.28;
  if (player.stance === 'aggressive') combatChance = 0.55;
  if (player.stance === 'stealth') combatChance = 0.12;
  // 若剩餘安全區只有 1 個且有 AI，強制拉高遇敵率進行最終決戰
  if (restrictedAreas.size >= GAME_DATA.areas.length - 1 && aiInArea.length > 0) {
    combatChance = 0.75;
  }

  if (Math.random() < combatChance) {
    // 觸發遭遇戰：若同區有 AI 倖存者，優先或隨機遭遇 AI，否則遭遇區域野生動物
    if (aiInArea.length > 0 && (Math.random() < 0.65 || restrictedAreas.size >= GAME_DATA.areas.length - 1)) {
      const bot = aiInArea[Math.floor(Math.random() * aiInArea.length)];
      activeEnemy = {
        isAI: true,
        ref: bot,
        name: bot.name,
        hp: bot.hp,
        maxHp: bot.maxHp,
        atk: bot.atk,
        def: bot.def,
        weaponName: bot.weaponName
      };
      logMessage(`🚨 遭遇敵方受試者 [${bot.name}] (持有:${bot.weaponName})！`, 'combat-msg');
    } else {
      const w = curArea.wild;
      activeEnemy = {
        isAI: false,
        name: w.name,
        hp: w.hp,
        maxHp: w.maxHp,
        atk: w.atk,
        def: w.def,
        exp: w.exp,
        drop: w.drop
      };
      logMessage(`🐾 探索時驚動了野生生物 [${w.name}]！`, 'combat-msg');
    }
    renderCombatCard('敵人正準備發動攻擊，請選擇交戰或撤退！');
  } else {
    // 發現區域物資
    const foundId = curArea.items[Math.floor(Math.random() * curArea.items.length)];
    const itemData = GAME_DATA.items[foundId];
    pendingFoundItem = { id: foundId, ...itemData };
    discItemName.innerText = itemData.name;
    discItemDesc.innerText = itemData.desc;
    discoveryCard.classList.remove('hidden');
    logMessage(`📦 探索發現了 [${itemData.name}]！`, 'gain-msg');
  }

  advanceWorldTick();
  updateUI();
}

function renderCombatCard(descText) {
  if (!activeEnemy) {
    combatCard.classList.add('hidden');
    return;
  }
  enemyTag.innerText = activeEnemy.isAI ? `🚨 敵方受試者 (${activeEnemy.weaponName})` : '🐾 野生動物';
  enemyStats.innerText = `攻 ${activeEnemy.atk} / 防 ${activeEnemy.def}`;
  enemyName.innerText = activeEnemy.name;
  enemyHpText.innerText = `HP ${activeEnemy.hp}/${activeEnemy.maxHp}`;
  const pct = Math.max(0, (activeEnemy.hp / activeEnemy.maxHp) * 100);
  enemyHpBar.style.width = `${pct}%`;
  combatRoundDesc.innerText = descText;
  combatCard.classList.remove('hidden');
}

function doAttack() {
  if (!activeEnemy || isGameOver) return;

  const pAtk = getPlayerAtk();
  const pDef = getPlayerDef();

  // 玩家攻擊敵人
  const isCrit = Math.random() < (player.stance === 'aggressive' ? 0.25 : 0.15);
  const rawDmg = Math.max(6, pAtk - Math.floor(activeEnemy.def * 0.45) + Math.floor(Math.random() * 5));
  const dmgToEnemy = isCrit ? Math.round(rawDmg * 1.4) : rawDmg;

  activeEnemy.hp = Math.max(0, activeEnemy.hp - dmgToEnemy);
  if (activeEnemy.isAI && activeEnemy.ref) {
    activeEnemy.ref.hp = activeEnemy.hp;
  }

  // 增加武器熟練度與經驗
  player.masteryExp += 8;
  gainExp(12);

  // 檢查敵人是否被擊殺
  if (activeEnemy.hp <= 0) {
    const defeated = activeEnemy;
    activeEnemy = null;
    combatCard.classList.add('hidden');
    player.kills += 1;

    if (defeated.isAI) {
      defeated.ref.alive = false;
      logMessage(`🔥 致命一擊 (${dmgToEnemy} 傷害)！你成功擊殺了受試者 [${defeated.name}]！`, 'craft-msg');
      gainExp(45);
      if (checkVictory()) {
        updateUI();
        return;
      }
    } else {
      // 野怪掉落戰利品
      const dropId = defeated.drop[Math.floor(Math.random() * defeated.drop.length)];
      const dropItem = GAME_DATA.items[dropId];
      logMessage(`⚔️ 擊斃了 [${defeated.name}] (造成 ${dmgToEnemy} 傷害)！搜出戰利品 [${dropItem.name}]！`, 'gain-msg');
      gainExp(defeated.exp || 25);

      pendingFoundItem = { id: dropId, ...dropItem };
      discItemName.innerText = dropItem.name;
      discItemDesc.innerText = `狩獵戰利品：${dropItem.desc}`;
      discoveryCard.classList.remove('hidden');
    }

    advanceWorldTick();
    updateUI();
    return;
  }

  // 敵人反擊
  const dmgToPlayer = Math.max(4, activeEnemy.atk - Math.floor(pDef * 0.5) + Math.floor(Math.random() * 4));
  player.hp = Math.max(0, player.hp - dmgToPlayer);

  // 若是 AI 且殘血，AI 有機率逃跑
  if (activeEnemy.isAI && activeEnemy.hp < 25 && Math.random() < 0.45) {
    const safeAreaIds = GAME_DATA.areas.map(a => a.id).filter(id => !restrictedAreas.has(id) && id !== player.area);
    if (safeAreaIds.length > 0) {
      activeEnemy.ref.area = safeAreaIds[Math.floor(Math.random() * safeAreaIds.length)];
      logMessage(`💥 你造成 ${dmgToEnemy} 傷害（受反擊 -${dmgToPlayer} HP）！重傷的 [${activeEnemy.name}] 趁隙逃離了此區域！`, 'combat-msg');
      activeEnemy = null;
      combatCard.classList.add('hidden');
      updateUI();
      return;
    }
  }

  const critText = isCrit ? '💥暴擊！' : '';
  const roundMsg = `${critText}你對 [${activeEnemy.name}] 造成 ${dmgToEnemy} 傷害，承受反擊 -${dmgToPlayer} HP！`;
  logMessage(roundMsg, 'combat-msg');
  renderCombatCard(roundMsg);

  if (player.hp <= 0) {
    triggerGameOver(false, `在與 [${activeEnemy.name}] 的交戰中力竭身亡。`);
    return;
  }

  updateUI();
}

function doFlee() {
  if (!activeEnemy || isGameOver) return;
  player.sp = Math.max(0, player.sp - 4);
  logMessage(`🏃 你掩護撤退，成功擺脫了 [${activeEnemy.name}] (-4 SP)。`, 'sys-msg');
  activeEnemy = null;
  combatCard.classList.add('hidden');
  updateUI();
}

function gainExp(amount) {
  player.exp += amount;
  while (player.exp >= player.level * 50) {
    player.level += 1;
    player.maxHp += 15;
    player.hp = Math.min(player.maxHp, player.hp + 15);
    player.maxSp += 10;
    player.baseAtk += 2;
    player.baseDef += 1;
    logMessage(`🆙 等級提升至 Lv.${player.level}！生命/精力上限與基礎攻防全面提升！`, 'craft-msg');
  }
}

// ==================== 拾取、背包管理與合成 ====================
function doPickup() {
  if (!pendingFoundItem) return;

  const emptyIdx = player.inventory.findIndex(s => s === null);
  if (emptyIdx === -1) {
    logMessage('背包已滿（最多 6 格）！請先點擊下方背包物品進行「裝備」或「丟棄」。', 'warn-msg');
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
    logMessage(`略過了 [${pendingFoundItem.name}]。`, 'sys-msg');
    pendingFoundItem = null;
    discoveryCard.classList.add('hidden');
  }
}

function openItemModal(slotIdx) {
  const itemId = player.inventory[slotIdx];
  if (!itemId) return;

  const it = GAME_DATA.items[itemId];
  selectedSlotIdx = slotIdx;

  itemModalTitle.innerText = it.name;
  itemModalDesc.innerText = it.desc;

  // 查詢此物品可參與的合成配方
  const related = GAME_DATA.recipes.filter(r => r.materials.includes(itemId));
  if (related.length > 0) {
    const lines = related.map(r => {
      const m1 = GAME_DATA.items[r.materials[0]]?.name;
      const m2 = GAME_DATA.items[r.materials[1]]?.name;
      const res = GAME_DATA.items[r.result];
      return `• ${m1} + ${m2} ➔ <strong style="color:#fde047;">${res.name}</strong>`;
    });
    itemModalRecipes.innerHTML = `<div>🔨 <strong>可合成配方</strong>：</div>${lines.join('<br>')}`;
    itemModalRecipes.style.display = 'block';
  } else {
    itemModalRecipes.innerHTML = '此為最終成品或直接消耗品。';
    itemModalRecipes.style.display = 'block';
  }

  if (it.type === 'material') {
    btnModalUse.style.display = 'none';
  } else {
    btnModalUse.style.display = 'flex';
    btnModalUse.innerText = it.type === 'consumable' ? '💊 使用恢復 [Enter]' : '🛡️ 裝備上陣 [Enter]';
  }

  itemModal.classList.remove('hidden');
}

function closeItemModal() {
  selectedSlotIdx = null;
  itemModal.classList.add('hidden');
}

btnModalCancel.onclick = closeItemModal;

btnModalDrop.onclick = () => {
  if (selectedSlotIdx !== null) {
    const itemId = player.inventory[selectedSlotIdx];
    const it = GAME_DATA.items[itemId];
    player.inventory[selectedSlotIdx] = null;
    logMessage(`🗑️ 丟棄了 [${it.name}]，清出了背包空間。`, 'warn-msg');
    closeItemModal();
    updateUI();
  }
};

btnModalUse.onclick = () => {
  if (selectedSlotIdx !== null) {
    const slot = selectedSlotIdx;
    closeItemModal();
    useOrEquip(slot);
  }
};

function useOrEquip(slotIdx) {
  const itemId = player.inventory[slotIdx];
  if (!itemId) return;

  const it = GAME_DATA.items[itemId];
  if (it.type === 'consumable') {
    if (it.heal_hp) player.hp = Math.min(player.maxHp, player.hp + it.heal_hp);
    if (it.heal_sp) player.sp = Math.min(player.maxSp, player.sp + it.heal_sp);
    player.inventory[slotIdx] = null;
    logMessage(`💊 使用了 [${it.name}]，恢復了狀態。`, 'gain-msg');
  } else if (it.type === 'weapon') {
    const old = player.equipment.weapon;
    player.equipment.weapon = itemId;
    player.inventory[slotIdx] = old;
    logMessage(`🗡️ 裝備了武器：[${it.name}] (攻擊 +${it.atk})！`, 'gain-msg');
  } else if (it.type === 'armor') {
    const slotType = it.subType === 'body' ? 'body' : 'arm';
    const old = player.equipment[slotType];
    player.equipment[slotType] = itemId;
    player.inventory[slotIdx] = old;
    logMessage(`🛡️ 裝備了防具：[${it.name}] (防禦 +${it.def})！`, 'gain-msg');
  }
  updateUI();
}

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
  player.crafts += 1;

  const resItem = GAME_DATA.items[resultId];
  logMessage(`🔨 成功合成出：[${resItem.name}]！(${resItem.desc})`, 'craft-msg');
  gainExp(25);
  updateUI();
}

// ==================== 休息、姿態與地圖移動 ====================
function doRest() {
  if (isGameOver) return;
  if (activeEnemy) {
    logMessage('⚠️ 戰鬥中無法休息！請先交戰或撤退！', 'warn-msg');
    return;
  }
  player.hp = Math.min(player.maxHp, player.hp + 22);
  player.sp = Math.min(player.maxSp, player.sp + 25);
  logMessage('💤 在掩體短暫調息 (+22 HP, +25 SP)。', 'gain-msg');
  advanceWorldTick();
  updateUI();
}

btnStance.onclick = () => {
  const order = ['normal', 'aggressive', 'stealth'];
  const next = order[(order.indexOf(player.stance) + 1) % order.length];
  player.stance = next;
  const labels = {
    normal: '⚖️ 切換為【均衡姿態】：標準探索與戰鬥平衡。',
    aggressive: '⚔️ 切換為【進攻姿態】：遇敵率大幅提升，總攻擊力 +15%！',
    stealth: '🥷 切換為【潛行姿態】：大幅降低遇敵率，適合專心搜刮材料與合成！'
  };
  logMessage(labels[next], 'sys-msg');
  updateUI();
};

btnOpenMap.onclick = () => {
  areaSelector.innerHTML = '';
  GAME_DATA.areas.forEach(a => {
    const btn = document.createElement('button');
    let cls = 'area-choice-btn';
    let statusBadge = '🟢 安全';
    if (restrictedAreas.has(a.id)) {
      cls += ' zone-closed';
      statusBadge = '🚫 已封鎖禁區';
    } else if (warningAreas.has(a.id)) {
      cls += ' zone-warn';
      statusBadge = '⚠️ 預告禁區';
    }
    if (player.area === a.id) cls += ' current-area';

    const aiCount = aiBots.filter(b => b.alive && b.area === a.id).length;
    btn.className = cls;
    btn.innerHTML = `
      <div>${a.name} ${player.area === a.id ? '(當前)' : ''}</div>
      <div style="font-size:0.7rem; font-weight:normal; color:#cbd5e1;">${statusBadge} ｜ 👤${aiCount}</div>
    `;
    btn.onclick = () => {
      if (player.area === a.id) {
        mapModal.classList.add('hidden');
        return;
      }
      if (player.sp < 3) {
        logMessage('精力不足無法移動（需 3 SP），請先休息！', 'warn-msg');
        return;
      }
      player.sp -= 3;
      player.area = a.id;
      activeEnemy = null;
      pendingFoundItem = null;
      combatCard.classList.add('hidden');
      discoveryCard.classList.add('hidden');
      mapModal.classList.add('hidden');
      logMessage(`🗺️ 已移動至 [${a.name}]。`, 'sys-msg');
      advanceWorldTick();
      updateUI();
    };
    areaSelector.appendChild(btn);
  });
  mapModal.classList.remove('hidden');
};

btnCloseMap.onclick = () => mapModal.classList.add('hidden');

// ==================== 合成圖鑑 ====================
function renderCodex(tab = 'all') {
  currentCodexTab = tab;
  document.querySelectorAll('.codex-tab').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tab);
  });

  codexList.innerHTML = '';
  const inv = player.inventory.filter(Boolean);

  GAME_DATA.recipes.forEach(r => {
    const resItem = GAME_DATA.items[r.result];
    if (!resItem) return;
    if (tab === 'weapon' && resItem.type !== 'weapon') return;
    if (tab === 'armor' && resItem.type !== 'armor') return;
    if (tab === 'consumable' && resItem.type !== 'consumable' && resItem.type !== 'material') return;

    const [m1, m2] = r.materials;
    const item1 = GAME_DATA.items[m1];
    const item2 = GAME_DATA.items[m2];
    const has1 = inv.includes(m1);
    const has2 = inv.includes(m2);

    const drop1 = findItemDropAreas(m1).join('/') || '合成取得';
    const drop2 = findItemDropAreas(m2).join('/') || '合成取得';

    let statStr = resItem.desc;
    const card = document.createElement('div');
    card.className = 'codex-card';
    card.innerHTML = `
      <div class="codex-card-top">
        <span class="codex-res-name">${resItem.name}</span>
        <span class="codex-res-stat">${statStr}</span>
      </div>
      <div class="codex-mats">
        <span class="mat-badge ${has1 ? 'owned' : ''}">${has1 ? '✓ ' : ''}${item1.name} <small>(${drop1})</small></span>
        <span>+</span>
        <span class="mat-badge ${has2 ? 'owned' : ''}">${has2 ? '✓ ' : ''}${item2.name} <small>(${drop2})</small></span>
      </div>
    `;
    codexList.appendChild(card);
  });
}

btnOpenCodex.onclick = () => {
  renderCodex(currentCodexTab);
  codexModal.classList.remove('hidden');
};

btnCloseCodex.onclick = () => codexModal.classList.add('hidden');

document.querySelectorAll('.codex-tab').forEach(tabBtn => {
  tabBtn.onclick = () => renderCodex(tabBtn.dataset.tab);
});

// ==================== 事件綁定與鍵盤快捷鍵 ====================
btnSearch.onclick = doSearch;
btnPickup.onclick = doPickup;
btnDiscard.onclick = doDiscard;
btnAttack.onclick = doAttack;
btnFlee.onclick = doFlee;
btnRest.onclick = doRest;
btnRestart.onclick = initGame;

window.addEventListener('keydown', (e) => {
  if (isGameOver) return;

  if (e.key === 'Escape') {
    if (!itemModal.classList.contains('hidden')) { closeItemModal(); return; }
    if (!codexModal.classList.contains('hidden')) { codexModal.classList.add('hidden'); return; }
    if (!mapModal.classList.contains('hidden')) { mapModal.classList.add('hidden'); return; }
    if (activeEnemy) { doFlee(); return; }
    if (!discoveryCard.classList.contains('hidden')) { doDiscard(); return; }
  }

  // 物品彈窗開啟時：Enter 使用/裝備，D 丟棄
  if (!itemModal.classList.contains('hidden')) {
    if (e.key === 'Enter' && btnModalUse.style.display !== 'none') {
      e.preventDefault();
      btnModalUse.click();
      return;
    }
    if (e.key.toLowerCase() === 'd') {
      btnModalDrop.click();
      return;
    }
    return;
  }

  // 戰鬥中：Space / Enter / A 攻擊
  if (activeEnemy) {
    if (e.key === ' ' || e.key === 'Enter' || e.key.toLowerCase() === 'a') {
      e.preventDefault();
      doAttack();
      return;
    }
    return;
  }

  // 發現物品時：Space / Enter 拾取
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

  if (e.key.toLowerCase() === 'r') { doRest(); return; }
  if (e.key.toLowerCase() === 'm') { btnOpenMap.click(); return; }
  if (e.key.toLowerCase() === 'b') { btnOpenCodex.click(); return; }
  if (e.key.toLowerCase() === 't') { btnStance.click(); return; }

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

// 啟動遊戲
initGame();
