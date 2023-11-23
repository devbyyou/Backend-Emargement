// routes/api/presenceRouter.js
const express = require('express');
const { presenceController } = require('../../controllers/api');
const authenticateToken = require('../../middlewares/authenticateToken');
const authorize = require('../../middlewares/authorize');
const roles = require('../../roles');
const { validateQRMiddleware } = require('../../middlewares/validateQRMiddleware');

const router = express.Router();

router
    .route('/equipes/:id/seances/:seanceId/presences')
    .get(authenticateToken, presenceController.getPresences)
    .post(
        validateQRMiddleware,
        authorize(roles.ENTRAINEUR),
        authenticateToken,
        presenceController.recordPresence,
    );

router
    .route('/equipes/:id/seances/:seanceId/presences/:joueurId')
    .delete(
        validateQRMiddleware,
        authorize(roles.ENTRAINEUR),
        authenticateToken,
        presenceController.markAbsent,
    );

router
    .route('/equipes/:id/seances/:seanceId/absences')
    .post(
        authenticateToken,
        validateQRMiddleware, // Utiliser le middleware de validation du QR Code
        authorize(roles.ENTRAINEUR),
        presenceController.recordAbsence,
    );

router
    .route('/equipes/:id/seances/:seanceId/retards')
    .post(
        authenticateToken,
        validateQRMiddleware, // Utiliser le middleware de validation du QR Code
        authorize(roles.ENTRAINEUR),
        presenceController.recordRetard,
    );

module.exports = router;
