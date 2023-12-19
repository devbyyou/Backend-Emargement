const roles = require('../../roles');
const { authService } = require('../../services/authService');

const { Equipes, Coaches } = require('../../models');

const equipeController = {
    getAllEquipes: async (req, res) => {
        try {
            const equipes = await Equipes.findAll();
            res.json(equipes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getEquipeById: async (req, res) => {
        const { id } = req.params;
        try {
            const equipe = await Equipes.findByPk(id);
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
        console.log('LE REQ.BODY EST :', req.body);
        console.log('LE REQ EST :', req.user.userId);
        const {
            nom, logo, categorieId, statut,
        } = req.body;
        const coachId = req.user.userId;
        try {
            const newEquipe = await Equipes.create({
                nom,
                logo,
                categorieId,
                statut,
                coachId,
            });
            // Ajouter l'équipe à l'ensemble des équipes associées à l'entraîneur
            const coach = await Coaches.findByPk(coachId);
            if (coach) {
                await coach.addEquipes(newEquipe);
            }
            res.status(201).json(newEquipe);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateEquipe: async (req, res) => {
        const { id } = req.params;
        const { nom, logo } = req.body;
        try {
            const equipe = await Equipes.findByPk(id);
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
            const equipe = await Equipes.findByPk(id);
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
