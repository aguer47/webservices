const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const swaggerui = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, origin, x-requested-with, accept, z-key');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/contacts', require('./routes/contacts'));
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerDocument));


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node is running on port ${port}`);
    });
  }
});
