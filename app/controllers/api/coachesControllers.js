const { Coach } = require('../../models');

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

};

module.exports = coachesController;
