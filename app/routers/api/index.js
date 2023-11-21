const express = require('express');
const authorize = require('../../middlewares/authorize');
const authenticateToken = require('../../middlewares/authenticateToken');

// const categoryRouter = require('./category');
const coachRouter = require('./coach');
const logoutRouter = require('./logout');
const { apiController } = require('../../controllers/api');
const roles = require('../../roles');

const router = express.Router();

// Route par défaut de l'API, ici on la confxigure pour toutes les méthodes
// afin de donner l'information en cas d'oubli de spéfication de la route par l'utilisateur
router.all('/', apiController.home);

// Route pour la création d'un coach avec vérification d'autorisation
router.route('/equipes')
    .post(authenticateToken, authorize(roles.ENTRAINEUR), apiController.postCoach);

// On préfixe les routers de l'API
// router.use('/categories', categoryRouter);
// router.use('/posts', postRouter);
router.use('/logout', logoutRouter);
router.use('/coaches', authenticateToken, coachRouter);
router.use((req, res) => {
    res.status(404).send('Service does not exists\nSee : https://doc.localhost.api');
});

module.exports = router;
