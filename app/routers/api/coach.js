// const createSchema = require('../../validation/schemas/postCreateSchema');
// const updateSchema = require('../../validation/schemas/postUpdateSchema');
const express = require('express');
const { coachesControllers: controller } = require('../../controllers/api');
const authenticateToken = require('../../middlewares/authenticateToken');

const router = express.Router();

router.route('/')
    .get(controller.getAll)
    .post(authenticateToken, controller.postCoach);

module.exports = router;
