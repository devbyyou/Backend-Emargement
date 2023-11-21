const jwt = require('jsonwebtoken');
const config = require('../config');
const roles = require('../roles');

const authorize = (requiredRole) => (req, res, next) => {
    // Récupération du token depuis les en-têtes de la requête
    const token = req.header('Authorization');

    // Vérification de la présence du token
    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
    }

    try {
        // Vérification et décodage du token
        const decodedToken = jwt.verify(token, config.secretKey);

        // Vérification du rôle de l'utilisateur
        if (!Object.values(roles).includes(decodedToken.role)) {
            return res.status(403).json({ message: 'Accès interdit. Rôle utilisateur incorrect.' });
        }

        if (requiredRole !== 'logout' && decodedToken.roles !== requiredRole) {
            return res.status(403).json({ message: 'Accès interdit. Rôle utilisateur incorrect.' });
        }
        // Ajout des informations utilisateur au req pour un accès ultérieur
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Accès interdit. Token invalide.' });
    }
};

module.exports = authorize;
