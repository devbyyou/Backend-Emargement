const { Seance } = require('../../models');

const seancesController = {
    getAll: async (req, res) => {
        try {
            const seances = await Seance.findAll();
            res.json(seances);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getOne: async (req, res) => {
        const { id, seanceId } = req.params;
        try {
            const seance = await Seance.findOne({ where: { id: seanceId, equipeId: id } });
            if (!seance) {
                return res.status(404).json({ message: 'Séance introuvable.' });
            }
            res.json(seance);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    create: async (req, res) => {
        const { id } = req.params;
        const { date, heure, lieu } = req.body;
        try {
            const newSeance = await Seance.create({
                date, heure, lieu, equipeId: id,
            });
            res.status(201).json(newSeance);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { id, seanceId } = req.params;
        const { date, heure, lieu } = req.body;
        try {
            const seance = await Seance.findOne({ where: { id: seanceId, equipeId: id } });
            if (!seance) {
                return res.status(404).json({ message: 'Séance introuvable.' });
            }
            await seance.update({ date, heure, lieu });
            res.json(seance);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        const { id, seanceId } = req.params;
        try {
            const seance = await Seance.findOne({ where: { id: seanceId, equipeId: id } });
            if (!seance) {
                return res.status(404).json({ message: 'Séance introuvable.' });
            }
            await seance.destroy();
            res.status(204).end();
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = seancesController;
