const areas = require('./data/areas.json');
const items = require('./data/items.json');
const recipes = require('./data/recipes.json');

class GameEngine {
  constructor(roomId = 'solo') {
    this.roomId = roomId;
    this.players = new Map();
    this.restrictedAreas = new Set();
    this.upcomingRestricted = new Set();
    this.areaItemPool = {};
    this.initWorld();
  }

  initWorld() {
    areas.forEach(a => {
      this.areaItemPool[a.id] = [...a.items];
    });
  }

  createPlayer(id, name = '倖存者', isAI = false) {
    const player = {
      id,
      name,
      isAI,
      hp: 100,
      maxHp: 100,
      sp: 80,
      maxSp: 80,
      area: 'school',
      stance: 'normal', // normal, aggressive, stealth, rest
      level: 1,
      exp: 0,
      mastery: { blade: 10, blunt: 10, hand: 10 },
      equipment: {
        weapon: null,
        head: null,
        body: null,
        arm: null,
        leg: null,
        accessory: null
      },
      inventory: [null, null, null, null, null, null], // 6 格
      status: 'alive'
    };
    this.players.set(id, player);
    return player;
  }

  getAvailableRecipes(playerId) {
    const player = this.players.get(playerId);
    if (!player) return [];
    
    // 收集背包中的物品 id
    const invItemIds = player.inventory.filter(Boolean);
    const available = [];

    recipes.forEach(recipe => {
      const [mat1, mat2] = recipe.materials;
      // 檢查是否擁有合成所需材料
      let hasMat1 = false;
      let hasMat2 = false;

      if (mat1 === mat2) {
        const count = invItemIds.filter(id => id === mat1).length;
        if (count >= 2) {
          hasMat1 = true;
          hasMat2 = true;
        }
      } else {
        hasMat1 = invItemIds.includes(mat1);
        hasMat2 = invItemIds.includes(mat2);
      }

      if (hasMat1 && hasMat2) {
        available.push({
          ...recipe,
          resultName: items[recipe.result]?.name || recipe.result,
          mat1Name: items[mat1]?.name || mat1,
          mat2Name: items[mat2]?.name || mat2
        });
      }
    });

    return available;
  }

  search(playerId) {
    const player = this.players.get(playerId);
    if (!player || player.status !== 'alive') return { error: '角色無法行動' };

    if (player.sp < 5) {
      return { error: '精力不足，請休息或飲用飲料！' };
    }

    player.sp = Math.max(0, player.sp - 5);
    const pool = this.areaItemPool[player.area];
    const foundItemId = pool[Math.floor(Math.random() * pool.length)];

    return {
      success: true,
      foundItem: {
        id: foundItemId,
        ...items[foundItemId]
      },
      player
    };
  }

  pickupItem(playerId, itemId) {
    const player = this.players.get(playerId);
    if (!player) return { error: '玩家不存在' };

    const emptySlot = player.inventory.findIndex(slot => slot === null);
    if (emptySlot === -1) {
      return { error: '背包已滿（最多 6 格）！' };
    }

    player.inventory[emptySlot] = itemId;
    return { success: true, inventory: player.inventory };
  }

  useOrEquipItem(playerId, slotIndex) {
    const player = this.players.get(playerId);
    if (!player) return { error: '玩家不存在' };

    const itemId = player.inventory[slotIndex];
    if (!itemId) return { error: '格子為空' };

    const itemData = items[itemId];
    if (!itemData) return { error: '物品無效' };

    // 消耗品
    if (itemData.type === 'consumable') {
      if (itemData.heal_hp) {
        player.hp = Math.min(player.maxHp, player.hp + itemData.heal_hp);
      }
      if (itemData.heal_sp) {
        player.sp = Math.min(player.maxSp, player.sp + itemData.heal_sp);
      }
      player.inventory[slotIndex] = null;
      return { success: true, action: 'consume', item: itemData, player };
    }

    // 裝備
    if (itemData.type === 'weapon') {
      const oldEquip = player.equipment.weapon;
      player.equipment.weapon = itemId;
      player.inventory[slotIndex] = oldEquip;
      return { success: true, action: 'equip', item: itemData, player };
    }

    if (itemData.type === 'armor') {
      const slotName = itemData.subType || 'body';
      const oldEquip = player.equipment[slotName];
      player.equipment[slotName] = itemId;
      player.inventory[slotIndex] = oldEquip;
      return { success: true, action: 'equip', item: itemData, player };
    }

    return { error: '此物品無法直接使用或裝備（素材類）' };
  }

  craft(playerId, resultId) {
    const player = this.players.get(playerId);
    if (!player) return { error: '玩家不存在' };

    const recipe = recipes.find(r => r.result === resultId);
    if (!recipe) return { error: '查無此合成配方' };

    const [mat1, mat2] = recipe.materials;
    const idx1 = player.inventory.indexOf(mat1);
    if (idx1 === -1) return { error: `缺少素材：${items[mat1]?.name || mat1}` };

    // 暫時移除 idx1 以利判定相同素材
    player.inventory[idx1] = null;
    const idx2 = player.inventory.indexOf(mat2);
    if (idx2 === -1) {
      player.inventory[idx1] = mat1; // 還原
      return { error: `缺少素材：${items[mat2]?.name || mat2}` };
    }

    // 成功消耗材料
    player.inventory[idx2] = null;

    // 將合成成果放回背包
    const freeSlot = player.inventory.indexOf(null);
    player.inventory[freeSlot] = resultId;

    // 獲得經驗
    player.exp += 20;
    if (player.exp >= player.level * 50) {
      player.level += 1;
      player.maxHp += 10;
      player.hp += 10;
      player.maxSp += 5;
    }

    return {
      success: true,
      resultItem: { id: resultId, ...items[resultId] },
      player,
      availableRecipes: this.getAvailableRecipes(playerId)
    };
  }

  move(playerId, targetAreaId) {
    const player = this.players.get(playerId);
    if (!player) return { error: '玩家不存在' };
    if (player.sp < 3) return { error: '精力不足無法移動' };

    const target = areas.find(a => a.id === targetAreaId);
    if (!target) return { error: '目標區域不存在' };

    player.sp = Math.max(0, player.sp - 3);
    player.area = targetAreaId;

    return { success: true, player, area: target };
  }

  rest(playerId) {
    const player = this.players.get(playerId);
    if (!player) return { error: '玩家不存在' };

    player.hp = Math.min(player.maxHp, player.hp + 15);
    player.sp = Math.min(player.maxSp, player.sp + 15);

    return { success: true, player };
  }
}

module.exports = { GameEngine, items, areas, recipes };
