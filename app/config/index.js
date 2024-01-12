const crypto = require('crypto');

// Génère une clé secrète aléatoire si aucune n'est spécifiée dans les variables d'environnement
const generateSecretKey = () => crypto.randomBytes(32).toString('hex');

// Utilisez la clé spécifiée dans les variables d'environnement, sinon utilisez une clé aléatoire
const secretKey = process.env.SECRET_KEY || generateSecretKey();

module.exports = {
   generateSecretKey,
   secretKey,
};
