const amqp = require('amqplib');

let ch= null;

const RabbitMQ = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL); 
  ch= await connection.createChannel();
  await ch.assertQueue('notification_queue');
};

const getChannel = () => ch; 

module.exports = { RabbitMQ, getChannel };