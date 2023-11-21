const express = require('express');
const authenticateToken = require('../../middlewares/authenticateToken');
const authorize = require('../../middlewares/authorize');
const { seancesController } = require('../../controllers/api');
const roles = require('../../roles');
const validateController = require('../../controllers/api/validateController');

const router = express.Router();

router.route('/')
    .get(seancesController.getAll)
    // eslint-disable-next-line max-len
    .post(validateController.validateSession, authenticateToken, authorize(roles.ENTRAINEUR), seancesController.create);

router.route('/:seanceId')
    .get(seancesController.getOne)
    .put(authenticateToken, authorize(roles.ENTRAINEUR), seancesController.update)
    .delete(authenticateToken, authorize(roles.ENTRAINEUR), seancesController.delete);

module.exports = router;
