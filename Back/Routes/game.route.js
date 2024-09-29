const express = require('express');
const router = express.Router();
const controller = require('../Controllers/game.controller');

router.post('/api/game/new', controller.createGame);
router.get('/api/games', controller.getUserGames);
router.get('/api/game', controller.getGameById);
router.patch('/api/game/update', controller.updateGame);

module.exports = router;