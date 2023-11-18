const express = require('express');

// const categoryRouter = require('./category');
const coachRouter = require('./coach');
const { apiController } = require('../../controllers/api');

const router = express.Router();

// Route par défaut de l'API, ici on la confxigure pour toutes les méthodes
// afin de donner l'information en cas d'oubli de spéfication de la route par l'utilisateur
router.all('/', apiController.home);

// On préfixe les routers de l'API
// router.use('/categories', categoryRouter);
// router.use('/posts', postRouter);
router.use('/coaches', coachRouter);
router.use((req, res) => {
    res.status(404).send('Service does not exists\nSee : https://doc.localhost.api');
});

module.exports = router;
