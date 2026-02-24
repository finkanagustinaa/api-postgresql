const swaggerJsdoc = require('swagger-jsdoc');
const categorySwagger = require('../routes/category_swagger')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Belajar PostgreSQL API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {              // ⬅️ ini penting
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;