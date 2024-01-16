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

console.log('21 extended: true');
app.use(express.urlencoded({ extended: true }));
console.log('23 extended: true');

app.use(cors(process.env.CORS_DOMAINS ?? '*'));
console.log('26 CORS ______>', process.env.CORS_DOMAINS);

app.use(router);
console.log('29 router');

app.use(authenticateToken);

app.use(errorHandler);
module.exports = app;
