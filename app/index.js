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

app.use(cors(process.env.CORS_DOMAINS ?? '*'));

app.use(router);

app.use(authenticateToken);
console.log(
   '27 env ______>',
   process.env.CORS_DOMAINS,
   process.env.PORT,
   process.env.PGUSER,
   process.env.PGHOST,
   process.env.PGPASSWORD,
   process.env.PGDATABASE,
   process.env.PGPORT,
   process.env.CORS_DOMAINS,
   process.env.API_DOCUMENTATION_ROUTE,
   process.env.SECRET_KEY,
   process.env.CLOUDINARY_CLOUD_NAME,
   process.env.CLOUDINARY_API_KEY,
   process.env.CLOUDINARY_SECRET_KEY,
);

app.use(errorHandler);
module.exports = app;
