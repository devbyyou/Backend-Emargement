const express = require('express');
const { qrcodeController } = require('../../controllers/api');
const authenticateToken = require('../../middlewares/authenticateToken');
// const authorize = require('../../middlewares/authorize');
// const roles = require('../../roles');

const router = express.Router();

router
    .route('/')
    .get(authenticateToken, qrcodeController.displayQrcode);

module.exports = router;
