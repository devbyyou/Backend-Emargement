// const Joi = require('joi');

// Middleware de validation générique pour le corps de la requête
const validateBody = (schema) => (req, res, next) => {
    const options = {
        abortEarly: false, // Collectez toutes les erreurs plutôt que de s'arrêter au premier échec
        allowUnknown: true, // Ignorer les clés inconnues dans le corps de la requête
        stripUnknown: true, // Supprimer les clés inconnues du corps de la requête
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).json({ error: errorMessage });
    }

    // eslint-disable-next-line max-len
    req.validatedData = value; // Stockez les données validées dans req pour une utilisation ultérieure
    next();
};

module.exports = {
    validateBody,
};
