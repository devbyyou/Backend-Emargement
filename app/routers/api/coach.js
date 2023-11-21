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
        controller.postCoach,
    );

module.exports = router;
