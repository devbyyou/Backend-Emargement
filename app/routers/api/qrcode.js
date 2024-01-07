const express = require('express');
const { qrcodeController } = require('../../controllers/api');
// const authenticateToken = require('../../middlewares/authenticateToken');
// const authorize = require('../../middlewares/authorize');
// const roles = require('../../roles');

const router = express.Router();

router
   .route('/');
// .get(authenticateToken, qrcodeController.displayQrcode);
router
   .route('/:joueur_id')
   .post(
      // authenticateToken,
      qrcodeController.updateLastActivity,
   );

module.exports = router;
