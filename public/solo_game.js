// ==================== 基礎常數 ====================
const WEAPON_TYPES = { blade: '劈砍', blunt: '鈍器', gun: '槍械', bow: '弓箭', hand: '拳套' };
const EQUIP_SLOTS = ['weapon', 'head', 'body', 'arm', 'leg', 'accessory'];
const SLOT_META = {
  weapon: { icon: '🗡️', empty: '空手' },
  head: { icon: '⛑️', empty: '無頭部' },
  body: { icon: '👕', empty: '無衣服' },
  arm: { icon: '🛡️', empty: '無臂甲' },
  leg: { icon: '👢', empty: '無鞋子' },
  accessory: { icon: '💍', empty: '無飾品' }
};
const MASTERY_RANKS = ['F', 'E', 'D', 'C', 'B', 'A', 'S', 'SS'];
const RARE_MATS = ['mithril', 'meteorite', 'tree_of_life'];
const ACTIONS_PER_PHASE = 12;
const BOSS_SPAWN_ACTION = 24;

// ==================== 基礎遊戲資料庫 ====================
const GAME_DATA = {
  areas: [
    {
      id: "school",
      name: "學校",
      desc: "荒廢的教學大樓，散落著文具、布料與運動用品",
      items: ["branch", "bandage", "lighter", "pen", "water", "cloth", "cap", "running_shoes", "watch", "kitchen_knife"],
      wild: { name: "變異烏鴉", hp: 45, maxHp: 45, atk: 13, def: 3, exp: 20, drop: ["feather", "herb", "meat"] }
    },
    {
      id: "hospital",
      name: "醫院",
      desc: "充滿消毒水氣味的診所，有醫療藥品、銳器與警衛配槍",
      items: ["bandage", "scalpel", "pills", "needle", "water", "alcohol", "pistol", "watch"],
      wild: { name: "狂暴實驗犬", hp: 65, maxHp: 65, atk: 18, def: 6, exp: 30, drop: ["leather", "bandage", "meat"] }
    },
    {
      id: "factory",
      name: "工廠",
      desc: "廢棄重工業區，能找到金屬零件、火藥與工地裝備",
      items: ["scrap_metal", "hammer", "iron_ore", "wire", "oil", "cloth", "helmet", "gunpowder"],
      wild: { name: "巡邏機械犬", hp: 80, maxHp: 80, atk: 22, def: 10, exp: 40, drop: ["scrap_metal", "steel", "wire", "gunpowder"] }
    },
    {
      id: "forest",
      name: "森林",
      desc: "島嶼中央的繁茂樹林，適合採集天然素材、毛皮與獵弓",
      items: ["branch", "stone", "herb", "flower", "water", "leather", "short_bow"],
      wild: { name: "叢林山豬", hp: 90, maxHp: 90, atk: 24, def: 12, exp: 45, drop: ["meat", "leather", "herb"] }
    },
    {
      id: "beach",
      name: "海灘",
      desc: "被海浪沖刷的海岸線，有龜殼、海魚與漂流廢鐵",
      items: ["scrap_metal", "stone", "water", "turtle_shell", "fish", "lighter", "slippers"],
      wild: { name: "巨型寄居蟹", hp: 75, maxHp: 75, atk: 19, def: 16, exp: 35, drop: ["turtle_shell", "fish", "water"] }
    }
  ],

  items: {
    // ---------- 基礎材料 ----------
    branch: { name: "樹枝", type: "material", desc: "隨處可見的堅韌樹枝" },
    stone: { name: "石頭", type: "material", desc: "硬質鵝卵石" },
    lighter: { name: "打火機", type: "material", desc: "可以生火、煮水或烘烤食物" },
    scrap_metal: { name: "廢鐵", type: "material", desc: "粗糙的鐵塊組件" },
    iron_ore: { name: "鐵礦石", type: "material", desc: "純淨的鐵礦，可與廢鐵精煉成鋼鐵" },
    turtle_shell: { name: "龜殼", type: "material", desc: "硬實的甲殼防禦素材" },
    needle: { name: "縫合針", type: "material", desc: "醫療用尖銳長針" },
    wire: { name: "鐵絲", type: "material", desc: "高韌性工業金屬線" },
    oil: { name: "機油", type: "material", desc: "易燃工業潤滑油" },
    flower: { name: "山茶花", type: "material", desc: "具有鎮靜功效的野生花朵" },
    cloth: { name: "布料", type: "material", desc: "厚實的帆布衣料" },
    leather: { name: "皮革", type: "material", desc: "堅韌的動物毛皮" },
    feather: { name: "鴉羽", type: "material", desc: "輕盈的黑色羽翎" },
    alcohol: { name: "高濃度酒精", type: "material", desc: "醫療消毒與燃燒溶劑" },
    gunpowder: { name: "火藥", type: "material", desc: "可製作彈藥或爆裂物" },
    steel: { name: "鋼鐵", type: "material", desc: "由廢鐵與鐵礦精煉的高硬度鋼材" },

    // ---------- 稀有素材 (空投 / Boss) ----------
    mithril: { name: "秘銀", type: "material", rare: true, desc: "★傳說金屬，僅能從空投或 Boss 取得" },
    meteorite: { name: "隕石", type: "material", rare: true, desc: "★天外隕鐵，僅能從空投或 Boss 取得" },
    tree_of_life: { name: "生命之樹", type: "material", rare: true, desc: "★蘊含生命力的神木枝，僅能從空投或 Boss 取得" },
    vf_blood: { name: "VF 血液", type: "material", rare: true, desc: "★變異體血液樣本，僅能擊敗 Wickeline 取得" },

    // ---------- 消耗品 ----------
    bandage: { name: "繃帶", type: "consumable", heal_hp: 22, desc: "乾淨的布條，回復 22 HP" },
    pills: { name: "止痛藥", type: "consumable", heal_hp: 35, desc: "強效止痛藥，回復 35 HP" },
    water: { name: "生水", type: "consumable", heal_sp: 25, desc: "甘甜的清水，回復 25 SP" },
    herb: { name: "草藥", type: "consumable", heal_hp: 18, desc: "清涼草藥，回復 18 HP" },
    fish: { name: "生鮮海魚", type: "consumable", heal_hp: 15, desc: "生吃回復 15 HP，烤熟效果極佳" },
    meat: { name: "生獸肉", type: "consumable", heal_hp: 20, desc: "生吃回復 20 HP，烤熟後大幅恢復" },
    boiled_water: { name: "熱水", type: "consumable", heal_sp: 45, desc: "剛煮沸的熱水 (+45 SP)" },
    herbal_tea: { name: "草本茶", type: "consumable", heal_sp: 70, heal_hp: 20, desc: "舒緩身心的草藥茶 (+70 SP, +20 HP)" },
    flower_tea: { name: "山茶花露", type: "consumable", heal_sp: 55, heal_hp: 40, desc: "芬芳提神的花茶 (+55 SP, +40 HP)" },
    first_aid_kit: { name: "急救包", type: "consumable", heal_hp: 75, desc: "專業戰地醫療包 (+75 HP)" },
    grilled_fish: { name: "炭烤海魚", type: "consumable", heal_hp: 60, heal_sp: 20, desc: "香氣四溢的烤魚 (+60 HP, +20 SP)" },
    steak: { name: "炙烤肉排", type: "consumable", heal_hp: 85, heal_sp: 25, desc: "頂級炙烤獸肉排 (+85 HP, +25 SP)" },
    med_alcohol: { name: "戰地止血劑", type: "consumable", heal_hp: 55, heal_sp: 15, desc: "酒精消毒強效繃帶 (+55 HP, +15 SP)" },

    // ---------- 武器：劈砍 ----------
    kitchen_knife: { name: "菜刀", type: "weapon", subType: "blade", atk: 12, desc: "廚房用菜刀 (劈砍 +12)" },
    pen: { name: "鋼筆", type: "weapon", subType: "blade", atk: 8, desc: "金屬筆尖的鋼筆 (劈砍 +8)" },
    scalpel: { name: "手術刀", type: "weapon", subType: "blade", atk: 15, desc: "鋒利的外科手術刀 (劈砍 +15)" },
    poison_scalpel: { name: "精密刺針刀", type: "weapon", subType: "blade", atk: 26, desc: "結合縫合針改造的暗殺刀 (劈砍 +26)" },
    feather_dagger: { name: "黑羽飛刀", type: "weapon", subType: "blade", atk: 27, desc: "裝配鴉羽尾翼的高速利刃 (劈砍 +27)" },
    steel_blade: { name: "精鋼短刀", type: "weapon", subType: "blade", atk: 38, desc: "冷光凜冽的鍛造短刀 (劈砍 +38)" },
    flame_blade: { name: "烈焰魔劍", type: "weapon", subType: "blade", atk: 54, desc: "塗滿燃油並點火的長刃 (劈砍 +54)" },
    mithril_blade: { name: "秘銀聖刃", type: "weapon", subType: "blade", atk: 72, desc: "★傳說級秘銀鍛造聖劍 (劈砍 +72)" },

    // ---------- 武器：鈍器 ----------
    hammer: { name: "鐵鎚", type: "weapon", subType: "blunt", atk: 13, desc: "工業重鐵鎚 (鈍器 +13)" },
    spiked_club: { name: "狼牙木棒", type: "weapon", subType: "blunt", atk: 24, desc: "纏繞鐵絲的木棒 (鈍器 +24)" },
    war_hammer: { name: "戰鎚", type: "weapon", subType: "blunt", atk: 34, desc: "沉重的鋼製重錘 (鈍器 +34)" },
    thor_hammer: { name: "雷霆粉碎鎚", type: "weapon", subType: "blunt", atk: 52, desc: "纏繞高壓電線的戰鎚 (鈍器 +52)" },
    meteor_hammer: { name: "隕星破滅鎚", type: "weapon", subType: "blunt", atk: 70, desc: "★傳說級隕鐵巨鎚 (鈍器 +70)" },

    // ---------- 武器：槍械 ----------
    pistol: { name: "警用手槍", type: "weapon", subType: "gun", atk: 14, desc: "制式小口徑手槍 (槍械 +14)" },
    magnum: { name: "麥格農左輪", type: "weapon", subType: "gun", atk: 36, desc: "填裝強裝藥的大口徑左輪 (槍械 +36)" },
    railgun: { name: "電磁軌道槍", type: "weapon", subType: "gun", atk: 70, desc: "★傳說級秘銀線圈電磁砲 (槍械 +70)" },

    // ---------- 武器：弓箭 ----------
    short_bow: { name: "短弓", type: "weapon", subType: "bow", atk: 13, desc: "輕便的狩獵短弓 (弓箭 +13)" },
    composite_bow: { name: "複合長弓", type: "weapon", subType: "bow", atk: 35, desc: "鋼製弓臂的複合弓 (弓箭 +35)" },
    eros_bow: { name: "生命神弓", type: "weapon", subType: "bow", atk: 68, desc: "★傳說級生命之樹神弓 (弓箭 +68)" },

    // ---------- 武器：拳套 ----------
    brass_knuckles: { name: "指虎", type: "weapon", subType: "hand", atk: 12, desc: "包覆皮革的鐵製指虎 (拳套 +12)" },
    steel_gauntlet: { name: "鋼鐵拳套", type: "weapon", subType: "hand", atk: 34, desc: "鋼板強化的格鬥拳套 (拳套 +34)" },
    meteor_fist: { name: "隕星拳套", type: "weapon", subType: "hand", atk: 66, desc: "★傳說級隕鐵拳套 (拳套 +66)" },

    // ---------- 防具：頭部 ----------
    cap: { name: "鴨舌帽", type: "armor", subType: "head", def: 4, desc: "普通的布帽 (防禦 +4)" },
    helmet: { name: "工地安全帽", type: "armor", subType: "head", def: 9, desc: "硬殼安全帽 (防禦 +9)" },
    tactical_helmet: { name: "戰術頭盔", type: "armor", subType: "head", def: 18, desc: "鋼板強化軍用頭盔 (防禦 +18)" },
    mithril_helmet: { name: "秘銀頭冠", type: "armor", subType: "head", def: 30, desc: "★傳說級秘銀頭冠 (防禦 +30)" },

    // ---------- 防具：身體 ----------
    leather_vest: { name: "獵人皮衣", type: "armor", subType: "body", def: 14, desc: "縫合布料與皮革 (防禦 +14)" },
    chain_armor: { name: "鋼鐵鎖子甲", type: "armor", subType: "body", def: 28, desc: "鋼鐵與鐵絲編織的重甲 (防禦 +28)" },
    combat_suit: { name: "特種防彈衣", type: "armor", subType: "body", def: 32, desc: "皮革強化鋼板的戰術護甲 (防禦 +32)" },
    vf_armor: { name: "VF 生體裝甲", type: "armor", subType: "body", def: 46, desc: "★傳說級變異生體護甲 (防禦 +46)" },

    // ---------- 防具：臂甲 ----------
    turtle_shield: { name: "龜甲盾", type: "armor", subType: "arm", def: 22, desc: "龜殼鋼盾 (防禦 +22)" },
    spiked_shield: { name: "荊棘臂盾", type: "armor", subType: "arm", def: 30, desc: "鑲嵌尖刺的合金重盾 (防禦 +30)" },

    // ---------- 防具：腿部 ----------
    slippers: { name: "拖鞋", type: "armor", subType: "leg", def: 3, desc: "聊勝於無的拖鞋 (防禦 +3)" },
    running_shoes: { name: "運動鞋", type: "armor", subType: "leg", def: 6, desc: "輕便的運動鞋 (防禦 +6)" },
    combat_boots: { name: "軍用戰靴", type: "armor", subType: "leg", def: 15, desc: "皮革強化的軍靴 (防禦 +15)" },
    meteor_boots: { name: "隕鐵戰靴", type: "armor", subType: "leg", def: 26, desc: "★傳說級隕鐵戰靴 (防禦 +26)" },

    // ---------- 飾品 ----------
    watch: { name: "手錶", type: "accessory", atk: 3, def: 2, desc: "精準計時的手錶 (攻 +3 / 防 +2)" },
    feather_charm: { name: "鴉羽護符", type: "accessory", atk: 7, def: 3, desc: "以鐵絲編織的羽毛護符 (攻 +7 / 防 +3)" },
    life_pendant: { name: "生命墜飾", type: "accessory", atk: 12, def: 8, desc: "★生命之樹雕刻墜飾 (攻 +12 / 防 +8)" },

    // ---------- 陷阱 ----------
    bear_trap: { name: "捕獸夾", type: "trap", dmg: 35, desc: "埋設於區域，路過的受試者踩中受 35 傷害" },
    landmine: { name: "土製地雷", type: "trap", dmg: 65, desc: "埋設於區域，路過的受試者踩中受 65 傷害" }
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

    // 素材
    { result: "steel", materials: ["scrap_metal", "iron_ore"] },

    // 劈砍
    { result: "poison_scalpel", materials: ["scalpel", "needle"] },
    { result: "feather_dagger", materials: ["scalpel", "feather"] },
    { result: "steel_blade", materials: ["scalpel", "steel"] },
    { result: "flame_blade", materials: ["steel_blade", "oil"] },
    { result: "mithril_blade", materials: ["flame_blade", "mithril"] },

    // 鈍器
    { result: "spiked_club", materials: ["branch", "wire"] },
    { result: "war_hammer", materials: ["hammer", "steel"] },
    { result: "thor_hammer", materials: ["war_hammer", "wire"] },
    { result: "meteor_hammer", materials: ["thor_hammer", "meteorite"] },

    // 槍械
    { result: "magnum", materials: ["pistol", "gunpowder"] },
    { result: "railgun", materials: ["magnum", "mithril"] },

    // 弓箭
    { result: "composite_bow", materials: ["short_bow", "steel"] },
    { result: "eros_bow", materials: ["composite_bow", "tree_of_life"] },

    // 拳套
    { result: "brass_knuckles", materials: ["scrap_metal", "leather"] },
    { result: "steel_gauntlet", materials: ["brass_knuckles", "steel"] },
    { result: "meteor_fist", materials: ["steel_gauntlet", "meteorite"] },

    // 防具
    { result: "tactical_helmet", materials: ["helmet", "steel"] },
    { result: "mithril_helmet", materials: ["tactical_helmet", "mithril"] },
    { result: "leather_vest", materials: ["cloth", "leather"] },
    { result: "chain_armor", materials: ["steel", "wire"] },
    { result: "combat_suit", materials: ["leather_vest", "steel"] },
    { result: "vf_armor", materials: ["combat_suit", "vf_blood"] },
    { result: "turtle_shield", materials: ["turtle_shell", "steel"] },
    { result: "spiked_shield", materials: ["turtle_shield", "wire"] },
    { result: "combat_boots", materials: ["running_shoes", "leather"] },
    { result: "meteor_boots", materials: ["combat_boots", "meteorite"] },

    // 飾品
    { result: "feather_charm", materials: ["feather", "wire"] },
    { result: "life_pendant", materials: ["feather_charm", "tree_of_life"] },

    // 陷阱
    { result: "bear_trap", materials: ["scrap_metal", "wire"] },
    { result: "landmine", materials: ["gunpowder", "scrap_metal"] }
  ]
};

// ==================== 可選角色 ====================
const CHARACTERS = [
  {
    id: "jackie", name: "傑琪", code: "06M-RF18", title: "連續殺人魔",
    weaponType: "blade", startWeapon: "kitchen_knife", hp: 100, sp: 80, atk: 13, def: 5,
    passive: { name: "嗜血", desc: "擊殺任何目標後回復 20 HP" },
    skill: { name: "血祭狂斬", desc: "造成 1.8 倍傷害", cost: 10, cd: 6 }
  },
  {
    id: "aya", name: "阿雅", code: "14M-RFT02", title: "前 FBI 探員",
    weaponType: "gun", startWeapon: "pistol", hp: 95, sp: 85, atk: 12, def: 4,
    passive: { name: "神射手", desc: "暴擊率 +10%" },
    skill: { name: "二連射", desc: "連續射擊兩次（各 0.8 倍傷害，可各自暴擊）", cost: 10, cd: 5 }
  },
  {
    id: "hyunwoo", name: "玄佑", code: "14M-RFT04", title: "街頭格鬥家",
    weaponType: "hand", startWeapon: "brass_knuckles", hp: 120, sp: 80, atk: 11, def: 9,
    passive: { name: "鋼鐵之軀", desc: "生命上限與基礎防禦天生較高" },
    skill: { name: "先發制人", desc: "1.3 倍傷害，並使敵人本回合無法反擊", cost: 8, cd: 5 }
  },
  {
    id: "nadine", name: "娜汀", code: "14M-RFT07", title: "荒野獵人",
    weaponType: "bow", startWeapon: "short_bow", hp: 95, sp: 90, atk: 12, def: 4,
    passive: { name: "狩獵本能", desc: "對野生動物與 Boss 傷害 +30%，狩獵戰利品 +1" },
    skill: { name: "穿心箭", desc: "無視敵方防禦，造成 1.5 倍傷害", cost: 12, cd: 6 }
  },
  {
    id: "magnus", name: "馬格努斯", code: "14M-RFT06", title: "機車黨老大",
    weaponType: "blunt", startWeapon: "hammer", hp: 110, sp: 75, atk: 12, def: 7,
    passive: { name: "硬漢", desc: "對受試者傷害 +15%，承受所有傷害 -10%" },
    skill: { name: "重機衝撞", desc: "1.5 倍傷害並擊暈敵人（本回合無法反擊）", cost: 10, cd: 6 }
  }
];

// AI 受試者池（排除玩家所選角色後取 9 名）
const AI_ROSTER = [
  { id: "jackie", name: "06M-RF18 傑琪", weapon: "雙刀", atk: 15, def: 6, bag: ["scalpel", "bandage", "leather"] },
  { id: "aya", name: "14M-RFT02 阿雅", weapon: "左輪手槍", atk: 16, def: 5, bag: ["pistol", "gunpowder", "boiled_water"] },
  { id: "hyunwoo", name: "14M-RFT04 玄佑", weapon: "皮手套", atk: 14, def: 8, bag: ["brass_knuckles", "turtle_shell", "water"] },
  { id: "fiora", name: "14M-RFT03 菲歐拉", weapon: "西洋劍", atk: 16, def: 6, bag: ["poison_scalpel", "herb", "steel"] },
  { id: "nadine", name: "14M-RFT07 娜汀", weapon: "獵弓", atk: 15, def: 5, bag: ["short_bow", "meat", "lighter"] },
  { id: "yuki", name: "15M-RFT16 雪", weapon: "太刀", atk: 16, def: 7, bag: ["steel_blade", "bandage", "flower_tea"] },
  { id: "rosalio", name: "14M-RFT10 羅薩里奧", weapon: "球棒", atk: 17, def: 6, bag: ["war_hammer", "pills", "wire"] },
  { id: "sissela", name: "15M-RFT18 席瑟拉", weapon: "暗器", atk: 14, def: 5, bag: ["feather_dagger", "first_aid_kit", "oil"] },
  { id: "magnus", name: "14M-RFT06 馬格努斯", weapon: "鐵管", atk: 15, def: 9, bag: ["spiked_club", "turtle_shield", "med_alcohol"] },
  { id: "leon", name: "15M-RFT20 里昂", weapon: "拳套", atk: 15, def: 8, bag: ["helmet", "running_shoes", "grilled_fish"] }
];

// ==================== 遊戲狀態 ====================
let player = null;
let aiBots = [];
let boss = null;
let airdrop = null;        // { area, items[] }
let playerTraps = [];      // { area, dmg, name }
let aiTraps = [];          // { area, dmg, name, ownerName }
let restrictedAreas = new Set();
let warningAreas = new Set();
let actionCounter = 0;

let pendingFoundItem = null;
let currentLootItems = [];
let activeEnemy = null;
let selectedSlotIdx = null;
let selectedEquipType = null;
let currentCodexTab = "all";
let isGameOver = true; // 選角前視為未開始

// ==================== DOM 快取 ====================
const $ = (id) => document.getElementById(id);
const hudName = $('hud-name');
const hudLevel = $('hud-level');
const btnStance = $('btn-stance');
const hudAlive = $('hud-alive');
const hudZoneTimer = $('hud-zone-timer');
const hpBar = $('hp-bar');
const hpText = $('hp-text');
const spBar = $('sp-bar');
const spText = $('sp-text');
const hudAtk = $('hud-atk');
const hudDef = $('hud-def');
const hudSkill = $('hud-skill');
const hudMastery = $('hud-mastery');

const areaBanner = $('area-banner');
const areaTitle = $('area-title');
const areaZoneTag = $('area-zone-tag');
const areaDesc = $('area-desc');
const areaDropsHint = $('area-drops-hint');
const combatLog = $('combat-log');
const inventoryGrid = $('inventory-grid');
const recipeList = $('recipe-list');

const discoveryCard = $('discovery-card');
const discItemName = $('disc-item-name');
const discItemDesc = $('disc-item-desc');

const lootCard = $('loot-card');
const lootTitle = $('loot-title');
const lootGrid = $('loot-grid');
const btnCloseLoot = $('btn-close-loot');

const combatCard = $('combat-card');
const enemyTag = $('enemy-tag');
const enemyStats = $('enemy-stats');
const enemyName = $('enemy-name');
const enemyHpText = $('enemy-hp-text');
const enemyHpBar = $('enemy-hp-bar');
const combatRoundDesc = $('combat-round-desc');

const itemModal = $('item-modal');
const itemModalTitle = $('item-modal-title');
const itemModalDesc = $('item-modal-desc');
const itemModalRecipes = $('item-modal-recipes');
const btnModalUse = $('btn-modal-use');
const btnModalUnequip = $('btn-modal-unequip');
const btnModalDrop = $('btn-modal-drop');
const btnModalCancel = $('btn-modal-cancel');

const mapModal = $('map-modal');
const areaSelector = $('area-selector');

const codexModal = $('codex-modal');
const codexList = $('codex-list');
const btnOpenCodex = $('btn-open-codex');
const btnCloseCodex = $('btn-close-codex');

const charModal = $('char-modal');
const charGrid = $('char-grid');

const gameoverModal = $('gameover-modal');
const gameoverTitle = $('gameover-title');
const gameoverDesc = $('gameover-desc');
const gameoverStats = $('gameover-stats');
const btnRestart = $('btn-restart');

const btnSearch = $('btn-search');
const btnRest = $('btn-rest');
const btnPickup = $('btn-pickup');
const btnDiscard = $('btn-discard');
const btnAttack = $('btn-attack');
const btnSkill = $('btn-skill');
const btnFlee = $('btn-flee');
const btnOpenMap = $('btn-open-map');
const btnCloseMap = $('btn-close-map');

// ==================== 通用工具 ====================
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const areaName = (id) => GAME_DATA.areas.find(a => a.id === id)?.name || '未知區域';
const safeAreas = () => GAME_DATA.areas.map(a => a.id).filter(id => !restrictedAreas.has(id));

function getEquipSlot(it) {
  if (!it) return null;
  if (it.type === 'weapon') return 'weapon';
  if (it.type === 'armor') return it.subType;
  if (it.type === 'accessory') return 'accessory';
  return null;
}

function getItemTag(it) {
  if (it.type === 'weapon') return `${WEAPON_TYPES[it.subType]}+${it.atk}`;
  if (it.type === 'armor') return `防+${it.def}`;
  if (it.type === 'accessory') return `攻${it.atk}/防${it.def}`;
  if (it.type === 'trap') return `陷阱${it.dmg}`;
  if (it.heal_hp) return `+${it.heal_hp}HP`;
  if (it.heal_sp) return `+${it.heal_sp}SP`;
  if (it.rare) return '★稀有';
  return '素材';
}

function logMessage(text, type = 'sys-msg') {
  const entry = document.createElement('div');
  entry.className = `log-entry ${type}`;
  entry.innerText = text;
  combatLog.appendChild(entry);
  combatLog.scrollTop = combatLog.scrollHeight;
}

// 所有玩家受到的傷害統一經此處理（套用馬格努斯被動減傷）
function applyDamageToPlayer(raw) {
  let dmg = Math.max(1, Math.round(raw));
  if (player.char.id === 'magnus') dmg = Math.max(1, Math.round(dmg * 0.9));
  player.hp = Math.max(0, player.hp - dmg);
  return dmg;
}

// ==================== 角色選擇 ====================
function showCharSelect() {
  isGameOver = true;
  gameoverModal.classList.add('hidden');
  charGrid.innerHTML = '';
  CHARACTERS.forEach(ch => {
    const card = document.createElement('button');
    card.className = 'char-card';
    card.innerHTML = `
      <div class="char-card-top">
        <span class="char-name">${ch.name} <small style="color:#94a3b8;font-weight:normal;">｜${ch.title}</small></span>
        <span class="char-code">${ch.code}</span>
      </div>
      <div class="char-tags">
        <span class="char-tag">🗡️ ${WEAPON_TYPES[ch.weaponType]}專精</span>
        <span class="char-tag">HP ${ch.hp}</span>
        <span class="char-tag">SP ${ch.sp}</span>
        <span class="char-tag">攻 ${ch.atk}</span>
        <span class="char-tag">防 ${ch.def}</span>
        <span class="char-tag">初始：${GAME_DATA.items[ch.startWeapon].name}</span>
      </div>
      <div class="char-skill">
        🔹 <strong>被動【${ch.passive.name}】</strong>：${ch.passive.desc}<br>
        ✨ <strong>技能【${ch.skill.name}】</strong>：${ch.skill.desc}（${ch.skill.cost} SP / 冷卻 ${ch.skill.cd} 回合）
      </div>
    `;
    card.onclick = () => initGame(ch.id);
    charGrid.appendChild(card);
  });
  charModal.classList.remove('hidden');
}

// ==================== 初始化 ====================
function initGame(charId) {
  const ch = CHARACTERS.find(c => c.id === charId) || CHARACTERS[0];
  isGameOver = false;
  actionCounter = 0;
  restrictedAreas.clear();
  warningAreas.clear();
  pendingFoundItem = null;
  currentLootItems = [];
  activeEnemy = null;
  selectedSlotIdx = null;
  selectedEquipType = null;
  boss = null;
  airdrop = null;
  playerTraps = [];
  aiTraps = [];

  const mastery = { blade: 0, blunt: 0, gun: 0, bow: 0, hand: 0 };
  mastery[ch.weaponType] = 25; // 專精武器起始 E 級

  player = {
    char: ch,
    name: `${ch.code} ${ch.name}`,
    hp: ch.hp, maxHp: ch.hp,
    sp: ch.sp, maxSp: ch.sp,
    baseAtk: ch.atk, baseDef: ch.def,
    level: 1, exp: 0,
    mastery,
    skillCd: 0,
    kills: 0, crafts: 0,
    stance: "normal",
    area: "school",
    equipment: { weapon: ch.startWeapon, head: null, body: null, arm: null, leg: null, accessory: null },
    inventory: ["water", "bandage", null, null, null, null]
  };

  const roster = AI_ROSTER.filter(r => r.id !== ch.id).slice(0, 9);
  aiBots = roster.map((tpl, idx) => ({
    id: `ai_${idx}`,
    name: tpl.name,
    weaponName: tpl.weapon,
    hp: 95, maxHp: 95,
    atk: tpl.atk, def: tpl.def,
    bag: [...tpl.bag],
    area: GAME_DATA.areas[(idx + 1) % GAME_DATA.areas.length].id,
    alive: true
  }));

  warningAreas.add("beach");

  combatLog.innerHTML = '';
  discoveryCard.classList.add('hidden');
  lootCard.classList.add('hidden');
  combatCard.classList.add('hidden');
  gameoverModal.classList.add('hidden');
  charModal.classList.add('hidden');

  logMessage(`📢 [亞格萊雅廣播] 盧米亞島生存實驗開始！你是受試者 ${player.name}。`, 'sys-msg');
  logMessage(`🧬 專精：${WEAPON_TYPES[ch.weaponType]}｜被動【${ch.passive.name}】｜技能【${ch.skill.name}】(戰鬥中按 Q)`, 'craft-msg');
  logMessage('⚠️ 第一階段禁區預告：[海灘] 將於 12 次行動後封鎖！', 'warn-msg');
  updateUI();
}

// ==================== 數值計算 ====================
function getCurrentWeaponType() {
  const w = player.equipment.weapon ? GAME_DATA.items[player.equipment.weapon] : null;
  return w ? w.subType : 'hand';
}

function getMasteryLevel(type) {
  return Math.min(MASTERY_RANKS.length - 1, Math.floor(player.mastery[type] / 25));
}

function getMasteryLabel() {
  const t = getCurrentWeaponType();
  const lv = getMasteryLevel(t);
  const pct = lv >= MASTERY_RANKS.length - 1 ? 100 : (player.mastery[t] % 25) * 4;
  return `${WEAPON_TYPES[t]} ${MASTERY_RANKS[lv]} (${pct}%)`;
}

function addMastery() {
  const t = getCurrentWeaponType();
  const before = getMasteryLevel(t);
  player.mastery[t] += (t === player.char.weaponType) ? 12 : 8;
  const after = getMasteryLevel(t);
  if (after > before) {
    logMessage(`📈 [${WEAPON_TYPES[t]}] 熟練度提升至 ${MASTERY_RANKS[after]} 級！攻擊力上升！`, 'craft-msg');
  }
}

function getPlayerAtk() {
  let atk = player.baseAtk + getMasteryLevel(getCurrentWeaponType()) * 3;
  const w = player.equipment.weapon ? GAME_DATA.items[player.equipment.weapon] : null;
  if (w) atk += w.atk || 0;
  const acc = player.equipment.accessory ? GAME_DATA.items[player.equipment.accessory] : null;
  if (acc) atk += acc.atk || 0;
  if (player.stance === "aggressive") atk = Math.round(atk * 1.15);
  return atk;
}

function getPlayerDef() {
  let def = player.baseDef;
  ['head', 'body', 'arm', 'leg', 'accessory'].forEach(slot => {
    const id = player.equipment[slot];
    if (id && GAME_DATA.items[id]) def += GAME_DATA.items[id].def || 0;
  });
  if (player.stance === "aggressive") def = Math.max(0, Math.round(def * 0.85));
  return def;
}

function getAliveCount() {
  return 1 + aiBots.filter(b => b.alive).length;
}

function findItemDropAreas(itemId) {
  const it = GAME_DATA.items[itemId];
  if (it && it.rare) return itemId === 'vf_blood' ? ['Wickeline'] : ['空投/Boss'];
  const list = [];
  GAME_DATA.areas.forEach(a => {
    if (a.items.includes(itemId)) list.push(a.name);
    if (a.wild && a.wild.drop.includes(itemId)) list.push(`${a.name}(野怪)`);
  });
  return list;
}

function getAllPlayerItemIds() {
  const ids = player.inventory.filter(Boolean);
  EQUIP_SLOTS.forEach(s => { if (player.equipment[s]) ids.push(player.equipment[s]); });
  return ids;
}

function hasRecipeMaterials(recipe, owned) {
  const [m1, m2] = recipe.materials;
  if (m1 === m2) return owned.filter(id => id === m1).length >= 2;
  return owned.includes(m1) && owned.includes(m2);
}

function getAvailableRecipes() {
  const owned = getAllPlayerItemIds();
  return GAME_DATA.recipes
    .filter(r => hasRecipeMaterials(r, owned))
    .map(r => ({ ...r, resultName: GAME_DATA.items[r.result]?.name || r.result }));
}

// ==================== 介面渲染 ====================
function updateUI() {
  if (!player) return;
  const ch = player.char;

  hudName.innerText = player.name;
  hudLevel.innerText = `Lv.${player.level}`;
  hudAlive.innerText = `👤 ${getAliveCount()}/10`;
  hudZoneTimer.innerText = `⏱️ ${ACTIONS_PER_PHASE - (actionCounter % ACTIONS_PER_PHASE)} 動`;

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

  hpBar.style.width = `${Math.max(0, (player.hp / player.maxHp) * 100)}%`;
  hpText.innerText = `HP ${player.hp} / ${player.maxHp}`;
  spBar.style.width = `${Math.max(0, (player.sp / player.maxSp) * 100)}%`;
  spText.innerText = `SP ${player.sp} / ${player.maxSp}`;

  hudAtk.innerText = getPlayerAtk();
  hudDef.innerText = getPlayerDef();
  hudMastery.innerText = getMasteryLabel();
  if (player.skillCd > 0) {
    hudSkill.className = 'stat-chip skill-chip cd';
    hudSkill.innerText = `✨ ${ch.skill.name} 冷卻 ${player.skillCd}`;
  } else {
    hudSkill.className = 'stat-chip skill-chip';
    hudSkill.innerText = `✨ ${ch.skill.name} 就緒`;
  }

  // 6 格裝備欄
  EQUIP_SLOTS.forEach(slot => {
    const el = $(`eq-${slot}`);
    const id = player.equipment[slot];
    const it = id ? GAME_DATA.items[id] : null;
    const meta = SLOT_META[slot];
    el.className = `eq-slot ${it ? 'active-eq' : ''}`;
    let stat = '';
    if (it) {
      if (it.type === 'weapon') stat = `+${it.atk}`;
      else if (it.type === 'accessory') stat = `+${it.atk}/${it.def}`;
      else stat = `+${it.def}`;
    }
    el.innerHTML = `${meta.icon} <span>${it ? `${it.name} ${stat}` : meta.empty}</span>`;
    el.title = it ? `${it.desc}（點擊卸下）` : meta.empty;
    el.onclick = () => openEquipModal(slot);
  });

  // 背包
  inventoryGrid.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const slot = document.createElement('div');
    const itemId = player.inventory[i];
    const it = itemId ? GAME_DATA.items[itemId] : null;
    slot.className = `inv-slot ${it ? 'occupied' : ''} ${it && it.rare ? 'rare-item' : ''}`;
    if (it) {
      slot.innerHTML = `<strong>${it.name}</strong><span class="slot-tag">${getItemTag(it)}</span>`;
      slot.onclick = () => openItemModal(i);
    } else {
      slot.innerHTML = `<span style="color:#475569; font-size:0.7rem;">[${i + 1}]</span>`;
    }
    inventoryGrid.appendChild(slot);
  }

  // 合成
  const available = getAvailableRecipes();
  recipeList.innerHTML = '';
  if (available.length === 0) {
    recipeList.innerHTML = '<div class="no-recipe">湊齊材料自動浮現（可點「📖 配方圖鑑」查詢）</div>';
  } else {
    available.forEach(r => {
      const resItem = GAME_DATA.items[r.result];
      const chip = document.createElement('div');
      chip.className = 'recipe-chip';
      chip.innerHTML = `<span>🔨</span> <span>${r.resultName} (${getItemTag(resItem)})</span>`;
      chip.onclick = () => craftItem(r.result);
      recipeList.appendChild(chip);
    });
  }

  // 區域
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
    const myTraps = playerTraps.filter(t => t.area === curArea.id).length;
    let html = `📦 <strong>區域物資</strong>：${dropNames}<br>🐾 <strong>野生生物</strong>：${curArea.wild.name} ｜ 📡 <strong>生命反應</strong>：${aiHere > 0 ? `<span style="color:#f87171;font-weight:bold;">偵測到 ${aiHere} 名受試者（休息可能遭突襲）</span>` : '周遭無其他受試者'}`;
    if (myTraps > 0) html += `<br>🪤 你在此區域埋設了 ${myTraps} 個陷阱`;
    if (airdrop && airdrop.area === curArea.id) html += `<br><span class="area-event-line">📦 補給空投就在附近！探索有機會找到</span>`;
    if (boss && boss.alive && boss.area === curArea.id) html += `<br><span class="area-boss-line">👹 Wickeline 博士在此區域徘徊！(HP ${boss.hp}/${boss.maxHp})</span>`;
    areaDropsHint.innerHTML = html;
  }
}

// ==================== 戰利品搜刮區 ====================
function openLoot(title, items) {
  currentLootItems = [...items];
  lootTitle.innerText = `${title} (${currentLootItems.length} 件)`;
  renderLootCard();
}

function renderLootCard() {
  if (!currentLootItems || currentLootItems.length === 0) {
    lootCard.classList.add('hidden');
    return;
  }
  lootGrid.innerHTML = '';
  currentLootItems.forEach((itemId, idx) => {
    const it = GAME_DATA.items[itemId];
    if (!it) return;
    const btn = document.createElement('button');
    btn.className = 'loot-item-btn';
    btn.innerHTML = `<span>${it.rare ? '⭐' : '📦'} <strong>${it.name}</strong></span><span class="loot-item-tag">${getItemTag(it)}</span>`;
    btn.onclick = () => pickupLootItem(idx);
    lootGrid.appendChild(btn);
  });
  lootCard.classList.remove('hidden');
}

function pickupLootItem(lootIdx) {
  const itemId = currentLootItems[lootIdx];
  if (!itemId) return;
  const emptyIdx = player.inventory.findIndex(s => s === null);
  if (emptyIdx === -1) {
    logMessage('⚠️ 背包已滿！可先使用或丟棄背包物品，再繼續拾取戰利品。', 'warn-msg');
    return;
  }
  player.inventory[emptyIdx] = itemId;
  currentLootItems.splice(lootIdx, 1);
  logMessage(`📥 拾取了 [${GAME_DATA.items[itemId].name}]！`, 'gain-msg');
  if (currentLootItems.length === 0) {
    lootCard.classList.add('hidden');
    logMessage('✨ 已搜刮完所有戰利品。', 'sys-msg');
  } else {
    renderLootCard();
  }
  updateUI();
}

btnCloseLoot.onclick = () => {
  if (currentLootItems.length > 0) logMessage('🚪 離開了現場，放棄剩餘的戰利品。', 'sys-msg');
  currentLootItems = [];
  lootCard.classList.add('hidden');
};

// ==================== 空投 / Boss / 陷阱 ====================
function spawnAirdrop() {
  const candidates = safeAreas().filter(id => !warningAreas.has(id));
  if (candidates.length === 0) return;
  const items = [rand(RARE_MATS), rand(['first_aid_kit', 'herbal_tea', 'steak', 'flower_tea'])];
  if (Math.random() < 0.4) items.push(rand(RARE_MATS));
  airdrop = { area: rand(candidates), items };
  logMessage(`📦 [空投廣播] 補給空投降落於 [${areaName(airdrop.area)}]！內含稀有素材，其他受試者也會爭奪！`, 'craft-msg');
}

function spawnBoss() {
  const candidates = safeAreas().filter(id => !warningAreas.has(id));
  const area = candidates.length > 0 ? rand(candidates) : rand(safeAreas());
  boss = {
    name: "Wickeline 博士",
    hp: 420, maxHp: 420, atk: 36, def: 20,
    area, alive: true,
    drop: ["vf_blood", "mithril", "meteorite", "tree_of_life", "first_aid_kit"]
  };
  logMessage(`👹 [緊急廣播] 實驗失控！VF 變異體「Wickeline 博士」出現在 [${areaName(area)}]！擊敗可取得 VF 血液與傳說素材！`, 'warn-msg');
}

// 玩家踩到 AI 陷阱檢定；回傳 true 代表玩家死亡
function checkEnemyTrap(baseChance) {
  const idx = aiTraps.findIndex(t => t.area === player.area);
  if (idx === -1) return false;
  let chance = baseChance;
  if (player.stance === 'stealth') chance *= 0.5;
  if (Math.random() >= chance) return false;
  const trap = aiTraps.splice(idx, 1)[0];
  const dmg = applyDamageToPlayer(trap.dmg);
  logMessage(`💥 你踩中了 ${trap.ownerName} 埋設的 [${trap.name}]！(-${dmg} HP)`, 'warn-msg');
  if (player.hp <= 0) {
    triggerGameOver(false, `踩中 ${trap.ownerName} 埋設的${trap.name}身亡。`);
    return true;
  }
  return false;
}

// ==================== 世界推進 ====================
function advanceWorldTick() {
  if (isGameOver) return;
  actionCounter++;
  if (player.skillCd > 0) player.skillCd--;

  // 禁區電擊
  if (restrictedAreas.has(player.area)) {
    const dmg = applyDamageToPlayer(25);
    logMessage(`⚡ 你滯留在已封鎖禁區，手環釋放高壓電流 (-${dmg} HP)！請立即移動！`, 'warn-msg');
    if (player.hp <= 0) {
      triggerGameOver(false, '滯留禁區過久，遭生命監控手環引爆淘汰。');
      return;
    }
  }

  const safeIds = safeAreas();

  // AI 移動、成長、埋陷阱
  aiBots.forEach(bot => {
    if (!bot.alive) return;
    if ((restrictedAreas.has(bot.area) || warningAreas.has(bot.area)) && safeIds.length > 0) {
      bot.area = rand(safeIds);
    } else if (Math.random() < 0.35 && safeIds.length > 0) {
      bot.area = rand(safeIds);
    }

    if (actionCounter % 5 === 0) {
      bot.atk += 2;
      bot.def += 1;
      bot.maxHp += 5;
      bot.hp = Math.min(bot.maxHp, bot.hp + 10);
      const areaObj = GAME_DATA.areas.find(a => a.id === bot.area);
      if (areaObj && bot.bag.length < 5) bot.bag.push(rand(areaObj.items));
    }

    if (aiTraps.length < 4 && Math.random() < 0.04 && !restrictedAreas.has(bot.area)) {
      aiTraps.push({ area: bot.area, dmg: 30, name: '捕獸夾', ownerName: bot.name });
    }
  });

  // 玩家陷阱觸發
  aiBots.forEach(bot => {
    if (!bot.alive) return;
    const tIdx = playerTraps.findIndex(t => t.area === bot.area);
    if (tIdx !== -1 && Math.random() < 0.6) {
      const t = playerTraps.splice(tIdx, 1)[0];
      bot.hp -= t.dmg;
      if (bot.hp <= 0) {
        bot.alive = false;
        player.kills += 1;
        gainExp(35);
        logMessage(`🪤 [陷阱擊殺] ${bot.name} 踩中你在 [${areaName(t.area)}] 的 [${t.name}] 當場死亡！(剩餘 ${getAliveCount()} 人)`, 'craft-msg');
      } else {
        logMessage(`🪤 ${bot.name} 踩中你在 [${areaName(t.area)}] 的 [${t.name}]！(-${t.dmg} HP)`, 'combat-msg');
      }
    }
  });
  if (checkVictory()) return;

  // AI 互相交戰
  const aliveBots = aiBots.filter(b => b.alive);
  if (aliveBots.length >= 2 && Math.random() < 0.28) {
    const attacker = rand(aliveBots);
    const others = aliveBots.filter(b => b.id !== attacker.id && (b.area === attacker.area || Math.random() < 0.35));
    if (others.length > 0) {
      const victim = rand(others);
      victim.hp -= Math.max(12, attacker.atk - Math.floor(victim.def * 0.5));
      if (victim.hp <= 0) {
        victim.alive = false;
        if (victim.bag.length > 0 && attacker.bag.length < 6) attacker.bag.push(victim.bag[0]);
        logMessage(`💀 [擊殺廣播] ${attacker.name} 在 [${areaName(victim.area)}] 擊殺了 ${victim.name}！(剩餘 ${getAliveCount()} 人)`, 'combat-msg');
        if (checkVictory()) return;
      }
    }
  }

  // 空投爭奪 / 銷毀
  if (airdrop) {
    if (restrictedAreas.has(airdrop.area)) {
      logMessage(`📦 [${areaName(airdrop.area)}] 的空投因禁區封鎖而遭銷毀。`, 'sys-msg');
      airdrop = null;
    } else {
      const grabbers = aiBots.filter(b => b.alive && b.area === airdrop.area);
      if (grabbers.length > 0 && Math.random() < 0.18) {
        const g = rand(grabbers);
        g.bag.push(...airdrop.items);
        g.atk += 8;
        g.def += 5;
        logMessage(`📦 [空投廣播] ${g.name} 搶走了 [${areaName(airdrop.area)}] 的空投！實力大增！`, 'warn-msg');
        airdrop = null;
      }
    }
  }

  // Boss 行為
  if (boss && boss.alive) {
    boss.hp = Math.min(boss.maxHp, boss.hp + 5);
    if ((restrictedAreas.has(boss.area) || warningAreas.has(boss.area)) && safeIds.length > 0) {
      boss.area = rand(safeIds);
      logMessage(`👹 Wickeline 博士移動到了 [${areaName(boss.area)}]！`, 'warn-msg');
    }
    const preys = aiBots.filter(b => b.alive && b.area === boss.area);
    if (preys.length > 0 && Math.random() < 0.1) {
      const prey = rand(preys);
      prey.alive = false;
      logMessage(`👹 [擊殺廣播] Wickeline 博士在 [${areaName(boss.area)}] 撕碎了 ${prey.name}！(剩餘 ${getAliveCount()} 人)`, 'warn-msg');
      if (checkVictory()) return;
    }
  }

  // 禁區階段推進
  if (actionCounter % ACTIONS_PER_PHASE === 0) {
    warningAreas.forEach(aId => {
      restrictedAreas.add(aId);
      logMessage(`🚫 [禁區封鎖] [${areaName(aId)}] 已正式封鎖！停留將遭受手環電擊！`, 'warn-msg');
    });
    warningAreas.clear();

    const remainingSafe = safeAreas();
    if (remainingSafe.length > 1) {
      const nextWarn = rand(remainingSafe);
      warningAreas.add(nextWarn);
      logMessage(`⚠️ [禁區預告] 下一個封鎖區域：[${areaName(nextWarn)}] (${ACTIONS_PER_PHASE} 動後)`, 'warn-msg');
      spawnAirdrop();
    } else if (remainingSafe.length === 1) {
      logMessage(`🔥 [最終決戰] 全島僅剩 [${areaName(remainingSafe[0])}] 為安全區！`, 'combat-msg');
    }

    if (actionCounter === BOSS_SPAWN_ACTION && !boss) spawnBoss();
  }
}

function checkVictory() {
  if (isGameOver) return true;
  if (getAliveCount() <= 1 && player.hp > 0) {
    triggerGameOver(true, '所有競爭受試者皆已淘汰，你成為盧米亞島唯一倖存者！');
    return true;
  }
  return false;
}

function triggerGameOver(isWin, reasonText) {
  isGameOver = true;
  activeEnemy = null;
  combatCard.classList.add('hidden');
  const rank = isWin ? 1 : getAliveCount();
  gameoverTitle.innerText = isWin ? '🏆 唯一倖存者 (第 1 名)！' : `💀 實驗淘汰 (第 ${rank} 名 / 10 人)`;
  gameoverTitle.style.color = isWin ? '#facc15' : '#ef4444';
  gameoverDesc.innerText = reasonText;

  const eqNames = EQUIP_SLOTS
    .map(s => player.equipment[s] ? GAME_DATA.items[player.equipment[s]].name : null)
    .filter(Boolean).join(' / ') || '無';

  gameoverStats.innerHTML = `
    <div>🧬 <strong>角色</strong>：${player.name}</div>
    <div>🎖️ <strong>最終排名</strong>：第 ${rank} 名 / 10 人</div>
    <div>⚔️ <strong>擊殺</strong>：${player.kills} ｜ <strong>等級</strong>：Lv.${player.level} ｜ ${getMasteryLabel()}</div>
    <div>🔨 <strong>合成</strong>：${player.crafts} 次 ｜ <strong>總行動</strong>：${actionCounter} 動</div>
    <div>🛡️ <strong>最終裝備</strong>：${eqNames}</div>
  `;
  gameoverModal.classList.remove('hidden');
}

// ==================== 遭遇戰 ====================
function spawnEnemyEncounter(isAmbush = false) {
  const curArea = GAME_DATA.areas.find(a => a.id === player.area);
  const aiInArea = aiBots.filter(b => b.alive && b.area === player.area);
  const bossHere = boss && boss.alive && boss.area === player.area;

  if (bossHere && Math.random() < 0.45) {
    activeEnemy = {
      isAI: false, isBoss: true, ref: boss,
      name: boss.name, hp: boss.hp, maxHp: boss.maxHp,
      atk: boss.atk, def: boss.def, exp: 120, drop: boss.drop
    };
  } else if (aiInArea.length > 0 && (Math.random() < 0.7 || isAmbush || restrictedAreas.size >= GAME_DATA.areas.length - 1)) {
    const bot = rand(aiInArea);
    activeEnemy = {
      isAI: true, ref: bot,
      name: bot.name, hp: bot.hp, maxHp: bot.maxHp,
      atk: bot.atk, def: bot.def, weaponName: bot.weaponName
    };
  } else {
    const w = curArea.wild;
    activeEnemy = {
      isAI: false, name: w.name, hp: w.hp, maxHp: w.maxHp,
      atk: w.atk, def: w.def, exp: w.exp, drop: w.drop
    };
  }

  if (isAmbush) {
    const dmg = applyDamageToPlayer(Math.max(6, (activeEnemy.atk - getPlayerDef() * 0.4) * 1.15));
    logMessage(`💥 突襲警報！你在毫無防備下遭到 [${activeEnemy.name}] 偷襲 (-${dmg} HP)！`, 'warn-msg');
    renderCombatCard(`遭到 [${activeEnemy.name}] 先手突襲 (-${dmg} HP)！請立即反擊或撤退！`);
    if (player.hp <= 0) triggerGameOver(false, `休息時遭到 [${activeEnemy.name}] 致命偷襲身亡。`);
  } else {
    let msg = `🐾 探索時驚動了野生生物 [${activeEnemy.name}]！`;
    if (activeEnemy.isAI) msg = `🚨 遭遇敵方受試者 [${activeEnemy.name}] (持有:${activeEnemy.weaponName})！`;
    if (activeEnemy.isBoss) msg = `👹 你遭遇了首領級變異體 [${activeEnemy.name}]！`;
    logMessage(msg, 'combat-msg');
    renderCombatCard('敵人正準備發動攻擊，請選擇交戰、技能或撤退！');
  }
}

function renderCombatCard(descText) {
  if (!activeEnemy) {
    combatCard.classList.add('hidden');
    return;
  }
  if (activeEnemy.isBoss) enemyTag.innerText = '👹 首領級變異體';
  else if (activeEnemy.isAI) enemyTag.innerText = `🚨 敵方受試者 (${activeEnemy.weaponName})`;
  else enemyTag.innerText = '🐾 野生動物';
  enemyStats.innerText = `攻 ${activeEnemy.atk} / 防 ${activeEnemy.def}`;
  enemyName.innerText = activeEnemy.name;
  enemyHpText.innerText = `HP ${activeEnemy.hp}/${activeEnemy.maxHp}`;
  enemyHpBar.style.width = `${Math.max(0, (activeEnemy.hp / activeEnemy.maxHp) * 100)}%`;
  combatRoundDesc.innerText = descText;

  const sk = player.char.skill;
  const ready = player.skillCd <= 0 && player.sp >= sk.cost;
  btnSkill.disabled = !ready;
  btnSkill.innerText = player.skillCd > 0 ? `✨ ${sk.name} (${player.skillCd})` : `✨ ${sk.name} [Q]`;
  btnFlee.innerText = '🏃 撤退 -5SP [Esc]';
  combatCard.classList.remove('hidden');
}

// ==================== 探索 ====================
function doSearch() {
  if (isGameOver) return;
  if (activeEnemy) {
    logMessage('⚠️ 正在遭遇敵襲！請先交戰或撤退！', 'warn-msg');
    return;
  }
  if (player.sp < 5) {
    logMessage('精力不足（需 5 SP），請休息或飲用飲料！', 'warn-msg');
    return;
  }

  player.sp = Math.max(0, player.sp - 5);
  discoveryCard.classList.add('hidden');
  lootCard.classList.add('hidden');
  pendingFoundItem = null;
  currentLootItems = [];

  if (checkEnemyTrap(0.15)) return;

  const curArea = GAME_DATA.areas.find(a => a.id === player.area);
  const aiInArea = aiBots.filter(b => b.alive && b.area === player.area);
  const bossHere = boss && boss.alive && boss.area === player.area;

  let combatChance = 0.28;
  if (player.stance === 'aggressive') combatChance = 0.55;
  if (player.stance === 'stealth') combatChance = 0.12;
  if (bossHere) combatChance = Math.max(combatChance, 0.4);
  if (restrictedAreas.size >= GAME_DATA.areas.length - 1 && aiInArea.length > 0) combatChance = 0.75;

  if (Math.random() < combatChance) {
    spawnEnemyEncounter(false);
  } else if (airdrop && airdrop.area === player.area && Math.random() < 0.55) {
    logMessage(`📦 你找到了補給空投箱！`, 'craft-msg');
    openLoot('📦 補給空投箱', airdrop.items);
    airdrop = null;
  } else {
    const foundId = rand(curArea.items);
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

// ==================== 戰鬥 ====================
function doAttack(useSkill = false) {
  if (!activeEnemy || isGameOver) return;
  const ch = player.char;

  let mult = 1, ignoreDef = false, noCounter = false, hits = 1, hitMult = 1;
  if (useSkill) {
    if (player.skillCd > 0) {
      logMessage(`⏳ 技能【${ch.skill.name}】冷卻中（剩餘 ${player.skillCd} 回合）。`, 'warn-msg');
      return;
    }
    if (player.sp < ch.skill.cost) {
      logMessage(`⚠️ 精力不足，發動【${ch.skill.name}】需 ${ch.skill.cost} SP。`, 'warn-msg');
      return;
    }
    player.sp -= ch.skill.cost;
    player.skillCd = ch.skill.cd;
    if (ch.id === 'jackie') mult = 1.8;
    if (ch.id === 'aya') { hits = 2; hitMult = 0.8; }
    if (ch.id === 'hyunwoo') { mult = 1.3; noCounter = true; }
    if (ch.id === 'nadine') { mult = 1.5; ignoreDef = true; }
    if (ch.id === 'magnus') { mult = 1.5; noCounter = true; }
    logMessage(`✨ 發動技能【${ch.skill.name}】！`, 'craft-msg');
  } else if (player.skillCd > 0) {
    player.skillCd--;
  }

  // 被動加成
  let passiveMult = 1;
  if (ch.id === 'nadine' && !activeEnemy.isAI) passiveMult = 1.3;
  if (ch.id === 'magnus' && activeEnemy.isAI) passiveMult = 1.15;
  let critRate = player.stance === 'aggressive' ? 0.25 : 0.15;
  if (ch.id === 'aya') critRate += 0.10;

  const pAtk = getPlayerAtk();
  let total = 0;
  let critAny = false;
  for (let h = 0; h < hits; h++) {
    const defPart = ignoreDef ? 0 : Math.floor(activeEnemy.def * 0.45);
    let dmg = Math.max(6, pAtk - defPart + Math.floor(Math.random() * 5));
    if (Math.random() < critRate) {
      dmg = Math.round(dmg * 1.4);
      critAny = true;
    }
    total += Math.round(dmg * mult * hitMult * passiveMult);
  }

  activeEnemy.hp = Math.max(0, activeEnemy.hp - total);
  if (activeEnemy.ref) activeEnemy.ref.hp = activeEnemy.hp;

  addMastery();
  gainExp(12);

  // ---------- 擊殺 ----------
  if (activeEnemy.hp <= 0) {
    const defeated = activeEnemy;
    activeEnemy = null;
    combatCard.classList.add('hidden');
    player.kills += 1;

    if (ch.id === 'jackie') {
      player.hp = Math.min(player.maxHp, player.hp + 20);
      logMessage('🩸 被動【嗜血】發動，回復 20 HP！', 'gain-msg');
    }

    if (defeated.isBoss) {
      defeated.ref.alive = false;
      logMessage(`🏆 [全島廣播] 你擊敗了 Wickeline 博士 (${total} 傷害)！`, 'craft-msg');
      gainExp(defeated.exp);
      openLoot('👹 Wickeline 博士的遺骸', defeated.drop);
    } else if (defeated.isAI) {
      defeated.ref.alive = false;
      logMessage(`🔥 致命一擊 (${total} 傷害)！你擊殺了受試者 [${defeated.name}]！`, 'craft-msg');
      gainExp(45);
      if (checkVictory()) {
        updateUI();
        return;
      }
      openLoot(`💀 [${defeated.name}] 的遺物箱`, defeated.ref.bag || []);
    } else {
      let count = 2 + (Math.random() < 0.45 ? 1 : 0) + (ch.id === 'nadine' ? 1 : 0);
      const drops = [...defeated.drop].sort(() => Math.random() - 0.5);
      const loot = [];
      for (let i = 0; i < count; i++) loot.push(drops[i % drops.length]);
      logMessage(`⚔️ 擊斃了 [${defeated.name}] (${total} 傷害)！可搜刮 ${loot.length} 件戰利品！`, 'gain-msg');
      gainExp(defeated.exp || 25);
      openLoot(`🐾 [${defeated.name}] 狩獵戰利品`, loot);
    }

    advanceWorldTick();
    updateUI();
    return;
  }

  const critText = critAny ? '💥暴擊！' : '';

  // ---------- 敵人無法反擊 (技能控制) ----------
  if (noCounter) {
    const msg = `${critText}你對 [${activeEnemy.name}] 造成 ${total} 傷害，敵人被壓制無法反擊！`;
    logMessage(msg, 'combat-msg');
    renderCombatCard(msg);
    updateUI();
    return;
  }

  // ---------- 敵人反擊 ----------
  const pDef = getPlayerDef();
  const dmgToPlayer = applyDamageToPlayer(Math.max(4, activeEnemy.atk - Math.floor(pDef * 0.5) + Math.floor(Math.random() * 4)));

  if (activeEnemy.isAI && activeEnemy.hp < 25 && Math.random() < 0.45) {
    const escapeIds = safeAreas().filter(id => id !== player.area);
    if (escapeIds.length > 0) {
      activeEnemy.ref.area = rand(escapeIds);
      logMessage(`💥 你造成 ${total} 傷害（受反擊 -${dmgToPlayer} HP）！重傷的 [${activeEnemy.name}] 趁隙逃離了此區域！`, 'combat-msg');
      activeEnemy = null;
      combatCard.classList.add('hidden');
      if (player.hp <= 0) {
        triggerGameOver(false, '在交戰中力竭身亡。');
        return;
      }
      updateUI();
      return;
    }
  }

  const roundMsg = `${critText}你對 [${activeEnemy.name}] 造成 ${total} 傷害，承受反擊 -${dmgToPlayer} HP！`;
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
  const pDef = getPlayerDef();
  const enemyRefName = activeEnemy.name;

  if (player.sp < 5) {
    const dmg = applyDamageToPlayer(Math.max(5, (activeEnemy.atk - pDef * 0.45) * 0.85));
    const msg = `⚠️ 精力不足（需 5 SP）突圍失敗！遭 [${enemyRefName}] 趁隙追砍 (-${dmg} HP)！`;
    logMessage(msg, 'warn-msg');
    renderCombatCard(msg);
    if (player.hp <= 0) {
      triggerGameOver(false, `體力透支無法逃脫，遭 [${enemyRefName}] 追擊身亡。`);
      return;
    }
    advanceWorldTick();
    updateUI();
    return;
  }

  player.sp = Math.max(0, player.sp - 5);
  let pursuitChance = 0.40;
  if (player.stance === 'aggressive') pursuitChance = 0.55;
  if (player.stance === 'stealth') pursuitChance = 0.18;

  if (Math.random() < pursuitChance) {
    const dmg = applyDamageToPlayer(Math.max(3, (activeEnemy.atk - pDef * 0.5) * 0.6));
    logMessage(`🏃 你強行突圍擺脫了 [${enemyRefName}] (-5 SP)，但遭追擊擦傷 (-${dmg} HP)！`, 'combat-msg');
    if (player.hp <= 0) {
      triggerGameOver(false, `在強行突圍時遭 [${enemyRefName}] 追擊身亡。`);
      return;
    }
  } else {
    logMessage(`🏃 你利用地形掩護，成功無傷擺脫了 [${enemyRefName}] (-5 SP)。`, 'sys-msg');
  }

  activeEnemy = null;
  combatCard.classList.add('hidden');
  advanceWorldTick();
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
    logMessage(`🆙 等級提升至 Lv.${player.level}！生命/精力上限與基礎攻防提升！`, 'craft-msg');
  }
}

// ==================== 拾取與物品管理 ====================
function doPickup() {
  if (!pendingFoundItem) return;
  const emptyIdx = player.inventory.findIndex(s => s === null);
  if (emptyIdx === -1) {
    logMessage('背包已滿（6 格）！請先使用、裝備或丟棄物品。', 'warn-msg');
    return;
  }
  player.inventory[emptyIdx] = pendingFoundItem.id;
  logMessage(`將 [${pendingFoundItem.name}] 收入背包第 ${emptyIdx + 1} 格。`, 'sys-msg');
  pendingFoundItem = null;
  discoveryCard.classList.add('hidden');
  updateUI();
}

function doDiscard() {
  if (!pendingFoundItem) return;
  logMessage(`略過了 [${pendingFoundItem.name}]。`, 'sys-msg');
  pendingFoundItem = null;
  discoveryCard.classList.add('hidden');
}

function renderItemRecipeHint(itemId) {
  const related = GAME_DATA.recipes.filter(r => r.materials.includes(itemId));
  if (related.length > 0) {
    const lines = related.map(r => {
      const m1 = GAME_DATA.items[r.materials[0]]?.name;
      const m2 = GAME_DATA.items[r.materials[1]]?.name;
      return `• ${m1} + ${m2} ➔ <strong style="color:#fde047;">${GAME_DATA.items[r.result].name}</strong>`;
    });
    itemModalRecipes.innerHTML = `<div>🔨 <strong>可進階合成</strong>：</div>${lines.join('<br>')}`;
  } else {
    itemModalRecipes.innerHTML = '此為頂級成品或直接消耗品。';
  }
}

function openItemModal(slotIdx) {
  const itemId = player.inventory[slotIdx];
  if (!itemId) return;
  const it = GAME_DATA.items[itemId];
  selectedSlotIdx = slotIdx;
  selectedEquipType = null;

  itemModalTitle.innerText = it.name;
  itemModalDesc.innerText = it.desc;
  renderItemRecipeHint(itemId);

  btnModalUnequip.style.display = 'none';
  if (it.type === 'material') {
    btnModalUse.style.display = 'none';
  } else {
    btnModalUse.style.display = 'flex';
    const labels = {
      consumable: '💊 使用恢復 [Enter]',
      weapon: '🗡️ 裝備武器 [Enter]',
      armor: '🛡️ 穿戴防具 [Enter]',
      accessory: '💍 佩戴飾品 [Enter]',
      trap: '🪤 埋設於此區域 [Enter]'
    };
    btnModalUse.innerText = labels[it.type] || '使用 [Enter]';
  }
  itemModal.classList.remove('hidden');
}

function openEquipModal(equipSlot) {
  if (isGameOver) return;
  const itemId = player.equipment[equipSlot];
  if (!itemId) {
    logMessage('該裝備槽目前為空。可從背包點擊對應裝備穿戴。', 'sys-msg');
    return;
  }
  const it = GAME_DATA.items[itemId];
  selectedSlotIdx = null;
  selectedEquipType = equipSlot;
  itemModalTitle.innerText = `[已裝備] ${it.name}`;
  itemModalDesc.innerText = it.desc;
  renderItemRecipeHint(itemId);
  btnModalUse.style.display = 'none';
  btnModalUnequip.style.display = 'flex';
  itemModal.classList.remove('hidden');
}

function closeItemModal() {
  selectedSlotIdx = null;
  selectedEquipType = null;
  itemModal.classList.add('hidden');
}

btnModalCancel.onclick = closeItemModal;

btnModalUnequip.onclick = () => {
  if (!selectedEquipType) return;
  const itemId = player.equipment[selectedEquipType];
  if (!itemId) return;
  const emptyIdx = player.inventory.findIndex(s => s === null);
  if (emptyIdx === -1) {
    logMessage('⚠️ 背包已滿，無法卸下裝備！請先清出 1 格空間。', 'warn-msg');
    closeItemModal();
    return;
  }
  player.equipment[selectedEquipType] = null;
  player.inventory[emptyIdx] = itemId;
  logMessage(`📥 已將 [${GAME_DATA.items[itemId].name}] 卸下放回背包第 ${emptyIdx + 1} 格。`, 'sys-msg');
  closeItemModal();
  updateUI();
};

btnModalDrop.onclick = () => {
  if (selectedSlotIdx !== null) {
    const it = GAME_DATA.items[player.inventory[selectedSlotIdx]];
    player.inventory[selectedSlotIdx] = null;
    logMessage(`🗑️ 丟棄了 [${it.name}]。`, 'warn-msg');
  } else if (selectedEquipType !== null) {
    const it = GAME_DATA.items[player.equipment[selectedEquipType]];
    player.equipment[selectedEquipType] = null;
    logMessage(`🗑️ 卸下並丟棄了 [${it.name}]。`, 'warn-msg');
  }
  closeItemModal();
  updateUI();
};

btnModalUse.onclick = () => {
  if (selectedSlotIdx === null) return;
  const slot = selectedSlotIdx;
  closeItemModal();
  useOrEquip(slot);
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
    updateUI();
    return;
  }

  if (it.type === 'trap') {
    if (activeEnemy) {
      logMessage('⚠️ 戰鬥中無法埋設陷阱！', 'warn-msg');
      return;
    }
    if (restrictedAreas.has(player.area)) {
      logMessage('⚠️ 禁區內埋設陷阱毫無意義。', 'warn-msg');
      return;
    }
    playerTraps.push({ area: player.area, dmg: it.dmg, name: it.name });
    player.inventory[slotIdx] = null;
    logMessage(`🪤 你在 [${areaName(player.area)}] 埋設了 [${it.name}]，等待獵物上門。`, 'sys-msg');
    advanceWorldTick();
    updateUI();
    return;
  }

  const slot = getEquipSlot(it);
  if (!slot) return;
  const old = player.equipment[slot];
  player.equipment[slot] = itemId;
  player.inventory[slotIdx] = old;
  const stat = it.type === 'weapon' ? `${WEAPON_TYPES[it.subType]} +${it.atk}` : it.type === 'accessory' ? `攻 +${it.atk} / 防 +${it.def}` : `防禦 +${it.def}`;
  logMessage(`🛡️ 裝備了 [${it.name}] (${stat})！`, 'gain-msg');
  updateUI();
}

// ==================== 合成 ====================
function consumeMaterialForCraft(matId) {
  const invIdx = player.inventory.indexOf(matId);
  if (invIdx !== -1) {
    player.inventory[invIdx] = null;
    return { from: 'inventory', slot: invIdx };
  }
  for (const eqSlot of EQUIP_SLOTS) {
    if (player.equipment[eqSlot] === matId) {
      player.equipment[eqSlot] = null;
      return { from: 'equip', slot: eqSlot };
    }
  }
  return null;
}

function craftItem(resultId) {
  const recipe = GAME_DATA.recipes.find(r => r.result === resultId);
  if (!recipe || !hasRecipeMaterials(recipe, getAllPlayerItemIds())) return;

  consumeMaterialForCraft(recipe.materials[0]);
  consumeMaterialForCraft(recipe.materials[1]);

  const resItem = GAME_DATA.items[resultId];
  player.crafts += 1;

  // 若成品對應的裝備槽為空（含剛被拿來合成的已穿戴裝備），自動穿上
  const slot = getEquipSlot(resItem);
  let placed = '';
  if (slot && !player.equipment[slot]) {
    player.equipment[slot] = resultId;
    placed = '(已自動裝備並更新攻防)';
  } else {
    const freeIdx = player.inventory.indexOf(null);
    if (freeIdx !== -1) {
      player.inventory[freeIdx] = resultId;
    } else {
      openLoot('🔨 合成成品（背包已滿）', [resultId]);
      placed = '(背包已滿，請從成品區拾取)';
    }
  }

  logMessage(`🔨 成功合成 [${resItem.name}]！${placed || `(${resItem.desc})`}`, 'craft-msg');
  gainExp(resItem.rare || /★/.test(resItem.desc) ? 50 : 25);
  updateUI();
}

// ==================== 休息、姿態、移動 ====================
function doRest() {
  if (isGameOver) return;
  if (activeEnemy) {
    logMessage('⚠️ 戰鬥中無法休息！', 'warn-msg');
    return;
  }
  discoveryCard.classList.add('hidden');
  lootCard.classList.add('hidden');
  pendingFoundItem = null;
  currentLootItems = [];

  const aiInArea = aiBots.filter(b => b.alive && b.area === player.area);
  const bossHere = boss && boss.alive && boss.area === player.area;
  let ambushChance = (aiInArea.length > 0 || bossHere) ? 0.38 : 0.10;
  if (player.stance === 'aggressive') ambushChance += 0.15;
  if (player.stance === 'stealth') ambushChance *= 0.4;

  if (Math.random() < ambushChance) {
    player.sp = Math.min(player.maxSp, player.sp + 10);
    spawnEnemyEncounter(true);
    if (isGameOver) return;
  } else {
    player.hp = Math.min(player.maxHp, player.hp + 22);
    player.sp = Math.min(player.maxSp, player.sp + 25);
    logMessage('💤 在掩體安全調息，未被發現 (+22 HP, +25 SP)。', 'gain-msg');
  }
  advanceWorldTick();
  updateUI();
}

btnStance.onclick = () => {
  if (isGameOver) return;
  const order = ['normal', 'aggressive', 'stealth'];
  player.stance = order[(order.indexOf(player.stance) + 1) % order.length];
  const labels = {
    normal: '⚖️ 切換為【均衡姿態】：標準探索與戰鬥平衡。',
    aggressive: '⚔️ 切換為【進攻姿態】：遇敵率提升，攻擊 +15%、暴擊率提升，防禦 -15%！',
    stealth: '🥷 切換為【潛行姿態】：降低遇敵、偷襲、踩陷阱與追擊機率！'
  };
  logMessage(labels[player.stance], 'sys-msg');
  updateUI();
};

btnOpenMap.onclick = () => {
  if (isGameOver) return;
  if (activeEnemy) {
    logMessage('⚠️ 交戰中被敵人纏住無法移動！請先擊敗敵人或「🏃 撤退」突圍！', 'warn-msg');
    return;
  }
  areaSelector.innerHTML = '';
  GAME_DATA.areas.forEach(a => {
    const btn = document.createElement('button');
    let cls = 'area-choice-btn';
    let statusBadge = '🟢 安全';
    if (restrictedAreas.has(a.id)) {
      cls += ' zone-closed';
      statusBadge = '🚫 禁區';
    } else if (warningAreas.has(a.id)) {
      cls += ' zone-warn';
      statusBadge = '⚠️ 預告';
    }
    if (player.area === a.id) cls += ' current-area';

    const aiCount = aiBots.filter(b => b.alive && b.area === a.id).length;
    let icons = '';
    if (airdrop && airdrop.area === a.id) icons += ' 📦';
    if (boss && boss.alive && boss.area === a.id) icons += ' 👹';
    const myTraps = playerTraps.filter(t => t.area === a.id).length;
    if (myTraps > 0) icons += ` 🪤${myTraps}`;

    btn.className = cls;
    btn.innerHTML = `
      <div>${a.name}${player.area === a.id ? ' (當前)' : ''}${icons}</div>
      <div style="font-size:0.7rem; font-weight:normal; color:#cbd5e1;">${statusBadge} ｜ 👤${aiCount}</div>
    `;
    btn.onclick = () => moveToArea(a);
    areaSelector.appendChild(btn);
  });
  mapModal.classList.remove('hidden');
};

function moveToArea(a) {
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
  currentLootItems = [];
  combatCard.classList.add('hidden');
  discoveryCard.classList.add('hidden');
  lootCard.classList.add('hidden');
  mapModal.classList.add('hidden');
  logMessage(`🗺️ 已移動至 [${a.name}]。`, 'sys-msg');

  if (checkEnemyTrap(0.5)) return;

  const aiHere = aiBots.filter(b => b.alive && b.area === a.id);
  const chance = player.stance === 'stealth' ? 0.05 : (player.stance === 'aggressive' ? 0.35 : 0.18);
  if (aiHere.length > 0 && Math.random() < chance) spawnEnemyEncounter(false);

  advanceWorldTick();
  updateUI();
}

btnCloseMap.onclick = () => mapModal.classList.add('hidden');

// ==================== 合成圖鑑 ====================
function renderCodex(tab = 'all') {
  currentCodexTab = tab;
  document.querySelectorAll('.codex-tab').forEach(el => el.classList.toggle('active', el.dataset.tab === tab));
  codexList.innerHTML = '';
  const owned = getAllPlayerItemIds();

  GAME_DATA.recipes.forEach(r => {
    const resItem = GAME_DATA.items[r.result];
    if (!resItem) return;
    if (tab === 'weapon' && resItem.type !== 'weapon') return;
    if (tab === 'armor' && resItem.type !== 'armor' && resItem.type !== 'accessory') return;
    if (tab === 'consumable' && !['consumable', 'material', 'trap'].includes(resItem.type)) return;

    const [m1, m2] = r.materials;
    const item1 = GAME_DATA.items[m1];
    const item2 = GAME_DATA.items[m2];
    const has1 = owned.includes(m1);
    const has2 = owned.includes(m2);
    const drop1 = findItemDropAreas(m1).join('/') || '合成';
    const drop2 = findItemDropAreas(m2).join('/') || '合成';

    const card = document.createElement('div');
    card.className = 'codex-card';
    card.innerHTML = `
      <div class="codex-card-top">
        <span class="codex-res-name">${resItem.name}</span>
        <span class="codex-res-stat">${getItemTag(resItem)}</span>
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
  if (!player) return;
  renderCodex(currentCodexTab);
  codexModal.classList.remove('hidden');
};
btnCloseCodex.onclick = () => codexModal.classList.add('hidden');
document.querySelectorAll('.codex-tab').forEach(tabBtn => {
  tabBtn.onclick = () => renderCodex(tabBtn.dataset.tab);
});

// ==================== 事件綁定與鍵盤 ====================
btnSearch.onclick = doSearch;
btnPickup.onclick = doPickup;
btnDiscard.onclick = doDiscard;
btnAttack.onclick = () => doAttack(false);
btnSkill.onclick = () => doAttack(true);
btnFlee.onclick = doFlee;
btnRest.onclick = doRest;
btnRestart.onclick = showCharSelect;

window.addEventListener('keydown', (e) => {
  if (isGameOver) return;
  const key = e.key.toLowerCase();

  if (e.key === 'Escape') {
    if (!itemModal.classList.contains('hidden')) { closeItemModal(); return; }
    if (!codexModal.classList.contains('hidden')) { codexModal.classList.add('hidden'); return; }
    if (!mapModal.classList.contains('hidden')) { mapModal.classList.add('hidden'); return; }
    if (activeEnemy) { doFlee(); return; }
    if (!lootCard.classList.contains('hidden')) { btnCloseLoot.click(); return; }
    if (!discoveryCard.classList.contains('hidden')) { doDiscard(); return; }
  }

  if (!itemModal.classList.contains('hidden')) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (btnModalUse.style.display !== 'none') btnModalUse.click();
      else if (btnModalUnequip.style.display !== 'none') btnModalUnequip.click();
    } else if (key === 'd') {
      btnModalDrop.click();
    }
    return;
  }

  if (activeEnemy) {
    if (e.key === ' ' || e.key === 'Enter' || key === 'a') {
      e.preventDefault();
      doAttack(false);
    } else if (key === 'q') {
      doAttack(true);
    }
    return;
  }

  if (!discoveryCard.classList.contains('hidden') && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    doPickup();
    return;
  }

  if (e.key === ' ' || key === 's') { e.preventDefault(); doSearch(); return; }
  if (key === 'r') { doRest(); return; }
  if (key === 'm') { btnOpenMap.click(); return; }
  if (key === 'b') { btnOpenCodex.click(); return; }
  if (key === 't') { btnStance.click(); return; }
  if (e.key >= '1' && e.key <= '6') { openItemModal(parseInt(e.key) - 1); return; }
  if (key === 'c') {
    const firstChip = recipeList.querySelector('.recipe-chip');
    if (firstChip) firstChip.click();
  }
});

// 啟動：先選角
showCharSelect();
