// const createSchema = require('../../validation/schemas/postCreateSchema');
// const updateSchema = require('../../validation/schemas/postUpdateSchema');
const express = require('express');
const { coachesControllers: controller } = require('../../controllers/api');

const router = express.Router();

router
    .route('/')
    .get(controller.getAll);
// .post('body', controller.create);

module.exports = router;
