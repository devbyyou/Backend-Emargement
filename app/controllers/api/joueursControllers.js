const { Joueur } = require('../../models');
const { authService } = require('../../services/authService');

const JoueuresController = {
    getAll: async (req, res) => {
        try {
            const joueurs = await Joueur.findAll();
            res.json(joueurs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getOne: async (req, res) => {
        const { id } = req.params;
        try {
            const joueur = await Joueur.findByPk(id);
            if (!joueur) {
                return res.status(404).json({ message: 'Joueur introuvable.' });
            }
            res.json(joueur);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    postJoueur: async (req, res) => {
        const { nom, prenom, email } = req.body;
        try {
            const nouveauJoueur = await Joueur.create({ nom, prenom, email });
            res.status(201).json(nouveauJoueur);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { nom, prenom, email } = req.body;
        try {
            const joueur = await Joueur.findByPk(id);
            if (!joueur) {
                return res.status(404).json({ message: 'Joueur introuvable.' });
            }
            await joueur.update({ nom, prenom, email });
            res.json(joueur);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const joueur = await Joueur.findByPk(id);
            if (!joueur) {
                return res.status(404).json({ message: 'Joueur introuvable.' });
            }
            await joueur.destroy();
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

};

module.exports = JoueuresController;
