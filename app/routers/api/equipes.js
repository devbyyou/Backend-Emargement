// routers/api.js

const express = require('express');
const { equipeController: controller } = require('../../controllers/api');
const validateController = require('../../controllers/api/validateController');

const router = express.Router();

router.route('/')
// Endpoint GET /equipes
    .get('/equipes', controller.getAllEquipes)
// Endpoint POST /equipes
    .post('/equipes', validateController.validateTeam, controller.createEquipe);

// Endpoint GET /equipes/:id
router.route('/:id')
    .get(controller.getEquipeById)
// Endpoint PUT /equipes/:id
    .put(validateController.validateTeam, controller.updateEquipe)
// Endpoint DELETE /equipes/:id
    .delete(controller.deleteEquipe);

module.exports = router;
