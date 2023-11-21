const roles = require('../../roles');
const { authService } = require('../../services/authService');

const { Equipe } = require('../../models');

const equipeController = {
    getAllEquipes: async (req, res) => {
        try {
            const equipes = await Equipe.findAll();
            res.json(equipes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getEquipeById: async (req, res) => {
        const { id } = req.params;
        try {
            const equipe = await Equipe.findByPk(id);
            if (!equipe) {
                res.status(404).json({ message: 'Équipe non trouvée.' });
            } else {
                res.json(equipe);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createEquipe: async (req, res) => {
        const { nom, logo } = req.body;
        try {
            const newEquipe = await Equipe.create({ nom, logo });
            res.status(201).json(newEquipe);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateEquipe: async (req, res) => {
        const { id } = req.params;
        const { nom, logo } = req.body;
        try {
            const equipe = await Equipe.findByPk(id);
            if (!equipe) {
                res.status(404).json({ message: 'Équipe non trouvée.' });
            } else {
                await equipe.update({ nom, logo });
                res.json(equipe);
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteEquipe: async (req, res) => {
        const { id } = req.params;
        try {
            const equipe = await Equipe.findByPk(id);
            if (!equipe) {
                res.status(404).json({ message: 'Équipe non trouvée.' });
            } else {
                await equipe.destroy();
                res.json({ message: 'Équipe supprimée avec succès.' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = equipeController;
