// logoutControllers.js
// const { authService } = require('../../services/authService');
const roles = require('../../roles');

const logoutControllers = {
    // Route de déconnexion
    logout: async (req, res) => {
        try {
            // Assurez-vous que le middleware authorize a
            // ajouté les informations utilisateur à req.user
            const { user } = req;

            // Vérifiez si l'utilisateur a le rôle requis
            if (user.role === roles.ENTRAINEUR) {
                // Supprimer ou invalider le token
                //  côté client ici (en fonction du mécanisme utilisé)

                // Indiquer une déconnexion réussie sans créer de nouvel utilisateur
                res.status(200).json({ message: 'Déconnexion réussie.' });
            } else {
                res.status(403).json({ message: 'Accès interdit. Rôle utilisateur incorrect.' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = logoutControllers;
