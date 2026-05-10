const router = require('express').Router();
const swaggerui = require('swagger-ui-express');
const swaggerDocument = require('../swagger_output.json');

router.use('/', swaggerui.serve);
router.get('/', swaggerui.setup(swaggerDocument));

module.exports = router;