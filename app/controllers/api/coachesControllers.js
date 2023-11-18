const { Coach } = require('../../models');

const coachesController = {
    getAll: async (req, res) => {
        try {
            const listId = req.params.id;
            const cards = await Coach.findAll(
                {
                    where: {
                        list_id: listId,
                    },
                    include: 'tags',
                    order: [
                        ['position', 'ASC'],
                    ],
                },
            );

            if (!cards) {
                res.status(404).json(`Cant find cards with list_id ${listId}`);
            } else {
                res.json(cards);
            }
        } catch (error) {
            // console.trace(error);
            res.status(500).json(error);
        }
    },

};

module.exports = coachesController;
