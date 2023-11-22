// routers/categoriesRouter.js

const express = require('express');
const { categoriesController } = require('../../controllers/api');
const authorize = require('../../middlewares/authorize');
const roles = require('../../roles');

const router = express.Router();

router.route('/')
    .get(categoriesController.getAllCategories)
    .post(authorize(roles.ENTRAINEUR), categoriesController.createCategory);

router.route('/:id')
    .get(categoriesController.getCategoryById)
    .put(authorize(roles.ENTRAINEUR), categoriesController.updateCategory)
    .delete(authorize(roles.ENTRAINEUR), categoriesController.deleteCategory);

module.exports = router;
