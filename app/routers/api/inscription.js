const express = require('express');
const { loginControllers: controller } = require('../../controllers/api');
// const authenticateToken = require('../../middlewares/authenticateToken');

const router = express.Router();

router
    .route('/')
    .post(controller.inscription);

module.exports = router;
