const Joi = require('joi');

const playerSchema = Joi.object({
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),
    repeat_password: Joi.ref('password'),
    // Ajoutez d'autres validations nécessaires pour les joueurs
});
const coachSchema = Joi.object({
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),

    repeat_password: Joi.ref('password'),
    // Ajoutez d'autres validations nécessaires pour les joueurs
});

const teamSchema = Joi.object({
    nom: Joi.string().required(),
    // Ajoutez d'autres validations nécessaires pour les équipes
});

const sessionSchema = Joi.object({
    date: Joi.date().iso().required(),
    lieu: Joi.string().required(),
    // Ajoutez d'autres validations nécessaires pour les séances d'entraînement
});

module.exports = {
    playerSchema,
    teamSchema,
    sessionSchema,
    coachSchema,
};
