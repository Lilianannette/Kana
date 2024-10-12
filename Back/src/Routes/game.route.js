const express = require('express');
const router = express.Router();
const controller = require('../Controllers/game.controller');
const authenticateJWT = require('../Middlewares/authMiddleware');


router.post('/api/game', authenticateJWT, controller.createGame);
router.get('/api/game', authenticateJWT, controller.getGamesByUser);
router.delete('/api/game', authenticateJWT, controller.deleteGame);

module.exports = router;
