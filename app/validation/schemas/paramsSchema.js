const Joi = require('joi');

const paramsSchema = Joi.object({
    id: Joi.number().required(),
});

module.exports = paramsSchema;
