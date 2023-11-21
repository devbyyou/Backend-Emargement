const jwt = require('jsonwebtoken');
const config = require('../config');
// const authService = require('../services/authService');

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
    jwt.verify(token, secretKey, async (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: 'Accès interdit. Token invalide.' });
        }

        // Ajout des informations utilisateur au req pour un accès ultérieur
        req.user = decodedToken;
        next();
    });
}

module.exports = authenticateToken;
