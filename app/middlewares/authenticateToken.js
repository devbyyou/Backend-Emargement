const jwt = require('jsonwebtoken');
const config = require('../config');
const authService = require('../services/authService');

const { secretKey } = config;

// Middleware d'authentification
function authenticateToken(req, res, next) {
    // Récupération du token depuis les en-têtes de la requête
    const token = req.header('Authorization');

    // Vérification de la présence du token
    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
    }

    // Vérification et décodage du token
    jwt.verify(token, secretKey, async (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Accès interdit. Token invalide.' });
        }

        // Ajout des informations utilisateur au req pour un accès ultérieur
        // Vous pouvez également vérifier l'utilisateur dans la base de données ici si nécessaire
        // Utilisez la fonction comparePasswords de authService pour vérifier le mot de passe

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
