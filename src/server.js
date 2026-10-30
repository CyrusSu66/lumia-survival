const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const { GameEngine, items, areas, recipes } = require('./engine');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// 靜態資料接口
app.get('/api/metadata', (req, res) => {
  res.json({ items, areas, recipes });
});

// 單人本地/伺服器房間管理器
const rooms = new Map();

function getOrCreateRoom(roomId = 'solo') {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new GameEngine(roomId));
  }
  return rooms.get(roomId);
}

io.on('connection', (socket) => {
  let currentRoomId = 'solo';
  let playerId = socket.id;

  socket.on('join_game', ({ name, roomId }) => {
    currentRoomId = roomId || 'solo';
    socket.join(currentRoomId);
    const engine = getOrCreateRoom(currentRoomId);
    const player = engine.createPlayer(playerId, name || '倖存者');
    
    socket.emit('game_state', {
      player,
      areas,
      items,
      recipes: engine.getAvailableRecipes(playerId)
    });
  });

  socket.on('search', () => {
    const engine = getOrCreateRoom(currentRoomId);
    const res = engine.search(playerId);
    socket.emit('search_result', res);
  });

  socket.on('pickup', ({ itemId }) => {
    const engine = getOrCreateRoom(currentRoomId);
    const res = engine.pickupItem(playerId, itemId);
    if (res.success) {
      const player = engine.players.get(playerId);
      socket.emit('update_inventory', {
        player,
        availableRecipes: engine.getAvailableRecipes(playerId)
      });
    } else {
      socket.emit('action_error', res.error);
    }
  });

  socket.on('use_item', ({ slotIndex }) => {
    const engine = getOrCreateRoom(currentRoomId);
    const res = engine.useOrEquipItem(playerId, slotIndex);
    if (res.success) {
      socket.emit('update_inventory', {
        player: res.player,
        availableRecipes: engine.getAvailableRecipes(playerId)
      });
    } else {
      socket.emit('action_error', res.error);
    }
  });

  socket.on('craft', ({ resultId }) => {
    const engine = getOrCreateRoom(currentRoomId);
    const res = engine.craft(playerId, resultId);
    if (res.success) {
      socket.emit('craft_success', res);
    } else {
      socket.emit('action_error', res.error);
    }
  });

  socket.on('move', ({ areaId }) => {
    const engine = getOrCreateRoom(currentRoomId);
    const res = engine.move(playerId, areaId);
    if (res.success) {
      socket.emit('move_result', res);
    } else {
      socket.emit('action_error', res.error);
    }
  });

  socket.on('rest', () => {
    const engine = getOrCreateRoom(currentRoomId);
    const res = engine.rest(playerId);
    if (res.success) {
      socket.emit('rest_result', res);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`[Project Lumia] 遊戲伺服器已在 http://localhost:${PORT} 啟動`);
});
