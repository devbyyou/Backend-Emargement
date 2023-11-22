const Joi = require('joi');

const bodySchema = Joi.object({
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    email: Joi.string().email().required(),
    // Ajoutez d'autres champs et règles de validation selon vos besoins
});

module.exports = bodySchema;
