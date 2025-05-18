const Notification = require('../models/db');
const { getChannel } = require('../setup/rabbitMQ');
const emailService = require('../services/email');
const smsService = require('../services/sms');
const inAppService = require('../services/inApp');


const max_retry = 4;

const processNotification = async (data) => {
  const notification = await Notification.findById(data.notificationId);
  if (!notification) return;

  let success = false;

  try {
    if (notification.type === 'email') {
      success = await emailService(notification.message);
    } else if (notification.type === 'sms') {
      success = await smsService(notification.message);
    } else if (notification.type === 'inApp') {
      success = await inAppService(notification.message);
    }

    notification.status = success ? 'sent' : 'failed';

    if (!success && notification.retry_count < max_retry) {
      notification.retryCount += 1;
      const ch = getChannel();
      ch.sendToQueue('notification_queue', Buffer.from(JSON.stringify({ notificationId: notification._id })));
    }

    await notification.save();
    }catch (err) {
    console.error("Worker error:", err.message);
  }
};

const startWorker = async () => {
  const ch = getChannel();
  await ch.consume('notification_queue', async (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      await processNotification(data);
      ch.ack(msg);
    }
  });
};

module.exports = { startWorker };
