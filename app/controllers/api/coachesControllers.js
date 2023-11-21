const { Coach } = require('../../models');
const roles = require('../../roles');
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
            // Assurez-vous que le middleware authorize a
            // ajouté les informations utilisateur à req.user
            const { user } = req;

            // Vérifiez si l'utilisateur a le rôle requis
            if (user.role !== roles.ENTRAINEUR) {
                return res.status(403).json({ message: 'Accès interdit. Rôle utilisateur incorrect.' });
            }

            // Création d'un nouveau coach
            const newUser = await authService.registerUser(req.body);
            res.status(201).json({ user: newUser });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

};

module.exports = coachesController;
