// controllers/api/presenceController.js

const { Presence } = require('../../models');

const presenceController = {
    // Obtient la liste des joueurs présents à une séance
    getPresences: async (req, res) => {
        try {
            const { id: equipeId, seanceId } = req.params;
            const presences = await Presence.findAll({ where: { equipeId, seanceId } });
            res.json(presences);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Enregistre la présence d'un joueur à une séance
    recordPresence: async (req, res) => {
        try {
            const { id: equipeId, seanceId } = req.params;
            const { joueurId } = req.body;
            const newPresence = await Presence.create({ equipeId, seanceId, joueurId });
            res.status(201).json(newPresence);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Marque un joueur comme absent à une séance
    markAbsent: async (req, res) => {
        try {
            const { id: equipeId, seanceId, joueurId } = req.params;
            await Presence.destroy({ where: { equipeId, seanceId, joueurId } });
            res.json({ message: 'Joueur marqué comme absent avec succès.' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = presenceController;
