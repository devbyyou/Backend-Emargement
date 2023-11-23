const { generateQRCode } = require('../../qrcode');
const { Seance } = require('../../models');

const qrcodeController = {

    displayQrcode: async (req, res) => {
        const { id } = req.params;
        const { date, heure, lieu } = req.body;
        let qrCodeUrl = null;
        try {
            // Si le QR code n'a pas encore été généré, générez-le
            if (!qrCodeUrl) {
                qrCodeUrl = await generateQRCode();
                console.log('QR Code URL:', qrCodeUrl);
            }

            const newSeance = await Seance.create({
                date, heure, lieu, equipeId: id,
            });

            res.status(201).json(newSeance);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = qrcodeController;
