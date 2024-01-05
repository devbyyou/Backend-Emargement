const express = require('express');
const authenticateToken = require('../../middlewares/authenticateToken');
const authorize = require('../../middlewares/authorize');
const { seancesController } = require('../../controllers/api');
const roles = require('../../roles');
// const validateController = require('../../controllers/api/validateController');

const router = express.Router();

router.route('/')
   .get(seancesController.getAll);

router.route('/:id')
   .post(
      //   validateController.validateSession,
      //   authenticateToken,
      //   authorize(roles.ENTRAINEUR),
      seancesController.create,
   )
   .get(seancesController.getOne)
   .put(authenticateToken, authorize(roles.ENTRAINEUR), seancesController.update)
   .delete(authenticateToken, authorize(roles.ENTRAINEUR), seancesController.delete);
router.route('/seance-passes')
   .get(authenticateToken, seancesController.getSeancesPassees);
module.exports = router;
