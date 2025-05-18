const express = require('express');
const router = express.Router();
const { sendNotification, getUserNotifications } = require('../Controllers/controller');

router.post('/notifications', sendNotification);
router.get('/users/:id/notifications', getUserNotifications);

module.exports = router;
