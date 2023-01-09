const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swagerDefinition: {
    info: {
      title: 'personal website API',
      description: 'personal website API Information',
      contact: {
        name: 'Ink',
      },
      servers: ['http://localhost:3000'],
    },
  },
  apis: ['web.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
