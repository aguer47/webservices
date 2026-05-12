const swaggerautogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'contacts API with Express and MongoDB'
  },
  host: 'localhost:3000',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerautogen(outputFile, endpointsFiles, doc);