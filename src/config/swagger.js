const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Café',
      version: '1.0.0',
      description: 'Documentação da API do sistema de café',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path para os arquivos de rotas
};

const specs = swaggerJsdoc(options);

module.exports = specs;
