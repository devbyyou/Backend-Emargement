const path = require('path');
const express = require('express');
const cors = require('cors');

const router = require('./routers');

const app = express();

const authenticateToken = require('./middlewares/authenticateToken');
// const config = require('./config');
const errorHandler = require('./errors');

// const { secretKey } = config;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(authenticateToken);

const corsOptions = {
   origin: process.env.CORS_DOMAINS ? process.env.CORS_DOMAINS.split(',') : '*',
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true,
   optionsSuccessStatus: 204,
   allowedHeaders: 'Content-Type,Authorization',

};

app.use(cors(corsOptions));

app.use(errorHandler);
module.exports = app;
