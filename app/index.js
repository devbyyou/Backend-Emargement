const path = require('path');
const express = require('express');
const cors = require('cors');

// Quand on ne précise pas de fichier dans le require, par défaut, node va vérifier s'il existe un
// fichier index.js, et require celui-là. Sinon il fait une erreur.
const router = require('./routers');

const app = express();
// require('./helpers/apiDocs')(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// On active le middleware pour parser le payload JSON
app.use(express.json());
// On active le middleware pour parser le payload urlencoded
app.use(express.urlencoded({ extended: true }));

// On lève la restriction CORS pour nos amis React
app.use(cors(process.env.CORS_DOMAINS ?? '*'));

app.use(router);

module.exports = app;
