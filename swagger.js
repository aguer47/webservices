const swaggerautogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'contacts API with Express and MongoDB'
  },
  host: 'webservices-6cvg.onrender.com',
  schemes: ['https'],
  excludePaths: ['/swagger.json']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerautogen(outputFile, endpointsFiles, doc);