// routers/api.js

const express = require('express');
const { equipeController: controller } = require('../../controllers/api');
const validateController = require('../../controllers/api/validateController');
const authorize = require('../../middlewares/authorize');
const roles = require('../../roles');

const router = express.Router();

router.route('/')
// Endpoint GET /equipes
    .get(controller.getAllEquipes)
// Endpoint POST /equipes
    .post(authorize(roles.ENTRAINEUR), validateController.validateTeam, controller.createEquipe);

// Endpoint GET /equipes/:id
router.route('/:id')
    .get(controller.getEquipeById)
// Endpoint PUT /equipes/:id
    .put(authorize(roles.ENTRAINEUR), validateController.validateTeam, controller.updateEquipe)
// Endpoint DELETE /equipes/:id
    .delete(authorize(roles.ENTRAINEUR), controller.deleteEquipe);

module.exports = router;