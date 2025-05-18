const Notification = require('../models/db');
const { getChannel } = require('../setup/rabbitMQ');

exports.sendNotification = async (req, res) => {
  const { userId, type, message } = req.body;

  try {
    const notification = new Notification({ userId, type, message });
    await notification.save();

    const ch = getChannel();
    ch.sendToQueue('notification_queue', Buffer.from(JSON.stringify({ notificationId: notification._id })));

    res.status(200).json({ message: 'Notification queued', id: notification._id });
  } catch (err) {
    res.status(401).json({ error: 'Failed to queue notification' });
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.id });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(401).json({ error: 'Failed to get notifications' });
  }
};
