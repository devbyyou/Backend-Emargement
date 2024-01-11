// routes/api/presenceRouter.js
const express = require('express');
const { presenceController } = require('../../controllers/api');
// const authenticateToken = require('../../middlewares/authenticateToken');
// const authorize = require('../../middlewares/authorize');
// const roles = require('../../roles');
// const { validateQRMiddleware } = require('../../middlewares/validateQRMiddleware');

const router = express.Router();
router
   .route('/:seance_id')
   .get(presenceController.getPresences);
router
   .route('/:joueur_id/:equipe_id')
   // .get(authenticateToken, presenceController.getPresences)
   .post(
      // validateQRMiddleware,
      // authorize(roles.ENTRAINEUR),
      // authenticateToken,
      presenceController.recordPresence,
   );

module.exports = router;
