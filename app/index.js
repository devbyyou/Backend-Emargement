const path = require('path');
const express = require('express');
const cors = require('cors');

const router = require('./routers');

const app = express();
console.log('app ->', process.env.PORT);

const authenticateToken = require('./middlewares/authenticateToken');
// const config = require('./config');
const errorHandler = require('./errors');

// const { secretKey } = config;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(process.env.CORS_DOMAINS ?? '*'));

app.use(router);
app.use(authenticateToken);

app.use(errorHandler);
module.exports = app;
