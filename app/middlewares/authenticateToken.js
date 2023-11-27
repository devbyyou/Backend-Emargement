const jwt = require('jsonwebtoken');
const config = require('../config');

const { secretKey } = config;

// Middleware d'authentification
function authenticateToken(req, res, next) {
    console.log('En-tête de la requête :', req.headers);

    // Récupération du token depuis les en-têtes de la requête
    const token = req.header('Authorization')?.split(' ')[1];
    console.log('le token est :', token);
    // Vérification de la présence du token
    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
    }

    // Vérification et décodage du token
    jwt.verify(token, secretKey, async (err, decodedToken) => {
        console.log('Token sk et dt  :', token, secretKey, decodedToken);
        if (err) {
            console.error('Erreur lors de la vérification du token :', err);
            return res.status(403).json({ message: 'Accès interdit. Token invalide.' });
        }
        console.log('Token décodé :', decodedToken);

        // Ajout des informations utilisateur au req pour un accès ultérieur
        req.user = decodedToken;
        next();
    });
}

module.exports = authenticateToken;
