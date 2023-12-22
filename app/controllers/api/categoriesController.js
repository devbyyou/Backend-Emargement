// controllers/categoriesController.js

const { Categories } = require('../../models');

const categoriesController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Categories.findAll();
            res.json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getCategoryById: async (req, res) => {
        const categoryId = req.params.id;
        try {
            const category = await Categories.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createCategory: async (req, res) => {
        const { name, description } = req.body;
        try {
            const newCategory = await Categories.create({ name, description });
            res.status(201).json(newCategory);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateCategory: async (req, res) => {
        const categoryId = req.params.id;
        const { name, description } = req.body;
        try {
            const category = await Categories.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            await category.update({ name, description });
            res.json(category);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteCategory: async (req, res) => {
        const categoryId = req.params.id;
        try {
            const category = await Categories.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            await category.destroy();
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = categoriesController;
