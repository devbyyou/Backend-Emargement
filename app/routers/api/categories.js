// routers/categoriesRouter.js

const express = require('express');
const { categoriesController } = require('../../controllers/api');

const router = express.Router();

router.route('/')
    .get(categoriesController.getAllCategories)
    .post(categoriesController.createCategory);

router.route('/:id')
    .get(categoriesController.getCategoryById)
    .put(categoriesController.updateCategory)
    .delete(categoriesController.deleteCategory);

module.exports = router;
