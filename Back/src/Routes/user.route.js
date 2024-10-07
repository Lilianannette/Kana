const express = require('express');
const router = express.Router();
const controller = require('../Controllers/user.controller');
const authenticateJWT = require('../Middlewares/authMiddleware');

router.post('/api/user', controller.signup);
router.post('/api/user/login', controller.login);
router.get('/api/user/profile', authenticateJWT, controller.getProfile);
router.patch('/api/user/edit', authenticateJWT, controller.editProfile);
router.delete('/api/user/delete', authenticateJWT, controller.deleteProfile);
router.post('/api/user/logout', authenticateJWT, controller.logout);
router.put('/api/user/password', authenticateJWT, controller.changePassword);


module.exports = router; 