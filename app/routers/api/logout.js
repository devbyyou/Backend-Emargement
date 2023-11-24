const express = require('express');
const { logoutControllers: controller } = require('../../controllers/api');
const authenticateToken = require('../../middlewares/authenticateToken');

const router = express.Router();

router
    .route('/')
    .post(authenticateToken, controller.logout);

module.exports = router;
