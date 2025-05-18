const express = require('express');
const router = express.Router();
const { sendNotification, getUserNotifications } = require('../Controllers/controller');

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Send a notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [email, sms, inApp]
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification queued successfully
 */
router.post('/notifications', sendNotification);

/**
 * @swagger
 * /users/{id}/notifications:
 *   get:
 *     summary: Get all notifications for a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of notifications
 */
router.get('/users/:id/notifications', getUserNotifications);

module.exports = router;
