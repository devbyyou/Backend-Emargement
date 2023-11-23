// middlewares/validateQRMiddleware.js
const { Seance } = require('../models');

async function validateQRMiddleware(req, res, next) {
    try {
        // Récupérer le QR Code scanné depuis la requête
        const scannedQRCode = req.body.qrCode; // adapter cela à structure de requête

        // Récupérer l'ID de l'équipe et de la séance depuis les paramètres de la requête
        const { id: equipeId, seanceId } = req.params;

        // Récupérer la séance en cours depuis la base de données
        const currentSeance = await Seance.findOne({
            where: {
                id: seanceId,
                equipeId,
                qrCode: scannedQRCode,
            },
        });

        // Vérifier si la séance avec le QR Code scanné existe et est associée à l'équipe
        if (!currentSeance) {
            return res.status(400).json({ message: 'QR Code invalide pour la séance en cours.' });
        }

        // Ajouter les informations de la séance à la requête pour un accès ultérieur
        req.currentSeance = currentSeance;

        // Passer au middleware suivant
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { validateQRMiddleware };
