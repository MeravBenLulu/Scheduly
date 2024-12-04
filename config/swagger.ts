import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Scheduly API',
      version: '1.0.0',
      description: 'API documentation for Scheduly',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Business: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the business',
            },
            description: {
              type: 'string',
              description: 'A description of the business',
            },
            email: {
              type: 'string',
              description: 'The email of the business',
            },
            telephone: {
              type: 'string',
              description: 'The telephone number of the business',
            },
            address: {
              type: 'string',
              description: 'The address of the business',
            },
          },
        },
      },
    },
  },
  apis: ['./src/controllers/*.ts'],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };