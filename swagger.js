const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notification Service API',
      version: '1.0.0',
      description: 'Backend API for sending email, SMS, and in-app notifications.',
    },
    servers: [
      {
        url: 'http://localhost:3306',
      },
    ],
  },
  apis: ['./Routes/routes.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
