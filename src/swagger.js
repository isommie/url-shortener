const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'URL Shortener API',
    version: '1.0.0',
    description: 'API documentation for the URL Shortener service',
    contact: {
      name: 'Support Team',
      email: 'support@example.com',
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
      description: 'Development Server',
    },
  ],
};

// Swagger options
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Path to the API docs (use JSDoc comments in route files)
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwaggerDocs = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs available at /api/docs');
};

module.exports = setupSwaggerDocs;
