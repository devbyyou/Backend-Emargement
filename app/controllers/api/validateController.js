const {
    playerSchema, teamSchema, sessionSchema, coachSchema,
} = require('../../validation');

const validateController = {
    validatePlayer: (req, res, next) => {
        const { error } = playerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    },
    validateCoach: (req, res, next) => {
        const { error } = coachSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    },

    validateTeam: (req, res, next) => {
        const { error } = teamSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    },

    validateSession: (req, res, next) => {
        const { error } = sessionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    },
};

module.exports = validateController;
