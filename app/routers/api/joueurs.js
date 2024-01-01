const express = require('express');
const { joueursControllers: controller } = require('../../controllers/api');
const authenticateToken = require('../../middlewares/authenticateToken');
const authorize = require('../../middlewares/authorize');
const roles = require('../../roles');
// const validateController = require('../../controllers/api/validateController');

const router = express.Router();

router.route('/')
   .get(authenticateToken, authorize(roles.ENTRAINEUR), controller.getAll);
// eslint-disable-next-line max-len

router.route('/:id')
   .get(authenticateToken, authorize(roles.ENTRAINEUR), controller.getOne)
   .post(
      //   validateController.validatePlayer,
      //   authenticateToken,
      //   authorize(roles.ENTRAINEUR),
      controller.postJoueur,
   )
// eslint-disable-next-line max-len
   .put(
      // validateController.validatePlayer,
      // authenticateToken,
      // authorize(roles.ENTRAINEUR),
      // authorize(roles.ENTRAINEUR),
      controller.update,
   )
   .delete(
      // authenticateToken,
      // authorize(roles.ENTRAINEUR),
      controller.delete,
   );
module.exports = router;
