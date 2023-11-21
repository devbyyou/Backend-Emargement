// routes/api/presenceRouter.js
const express = require('express');
const { presenceController } = require('../../controllers/api');
const authenticateToken = require('../../middlewares/authenticateToken');

const router = express.Router();

router
    .route('/equipes/:id/seances/:seanceId/presences')
    .get(authenticateToken, presenceController.getPresences)
    .post(authenticateToken, presenceController.recordPresence);

router
    .route('/equipes/:id/seances/:seanceId/presences/:joueurId')
    .delete(authenticateToken, presenceController.markAbsent);

module.exports = router;
