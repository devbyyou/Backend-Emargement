const express = require('express');
// const authenticateToken = require('../middlewares/authenticateToken');

const apiRouter = require('./api');
// const websiteRouter = require('./website');
// const { errorHandler } = require('../helpers/errorHandler');

const router = express.Router();

// On préfixe les routers

// ! attention à l'ordre des routers. Il faut aller du plus spécifique au plus générique afin que le
// parcours des middleware ne soit pas interrompu par une middleware 404 dans l'un de ces routeurs
router.use('/api', apiRouter);

// router.use('/', websiteRouter);

module.exports = router;
