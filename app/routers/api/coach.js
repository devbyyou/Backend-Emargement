const express = require('express');
const { coachesControllers: controller } = require('../../controllers/api');
const authenticateToken = require('../../middlewares/authenticateToken');
const authorize = require('../../middlewares/authorize');
const roles = require('../../roles');
const validateController = require('../../controllers/api/validateController');

const router = express.Router();

router.route('/')
    .get(controller.getAll)
    .post(
        validateController.validateCoach,
        authenticateToken,
        authorize(roles.ENTRAINEUR),
        controller.createCoach,
    );

router.route('/:id')
    .get(controller.getById)
    .put(
        validateController.validateCoach,
        authenticateToken,
        authorize([roles.ENTRAINEUR]),
        controller.updateCoach,
    )
    .delete(authenticateToken, authorize([roles.ENTRAINEUR]), controller.deleteCoach);

module.exports = router;
