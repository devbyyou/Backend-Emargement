const Joi = require('joi');

function errorHandler(err, req, res, next) {
   if (err instanceof Joi.ValidationError) {
      return res.status(400).json({ error: err.details[0].message });
   }

   next(err);
}

module.exports = errorHandler;
