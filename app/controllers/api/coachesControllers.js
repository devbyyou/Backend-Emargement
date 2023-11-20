const { Coach } = require('../../models');
const { authService } = require('../../services/authService');

const coachesController = {
    getAll: async (req, res) => {
        try {
            const tags = await Coach.findAll();
            res.json(tags);
        } catch (error) {
            // console.trace(error);
            res.status(500).json(error);
        }
    },
    postCoach: async (req, res) => {
        try {
            const newUser = await authService.registerUser(req.body);
            res.status(201).json({ user: newUser });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

};

module.exports = coachesController;
