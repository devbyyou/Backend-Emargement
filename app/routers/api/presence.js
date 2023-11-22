// routes/api/presenceRouter.js
const express = require('express');
const { presenceController } = require('../../controllers/api');
const authenticateToken = require('../../middlewares/authenticateToken');
const authorize = require('../../middlewares/authorize');
const roles = require('../../roles');

const router = express.Router();

router
    .route('/equipes/:id/seances/:seanceId/presences')
    .get(authenticateToken, presenceController.getPresences)
    .post(authorize(roles.ENTRAINEUR), authenticateToken, presenceController.recordPresence);

router
    .route('/equipes/:id/seances/:seanceId/presences/:joueurId')
    .delete(authorize(roles.ENTRAINEUR), authenticateToken, presenceController.markAbsent);

module.exports = router;
