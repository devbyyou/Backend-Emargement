/* eslint-disable camelcase */
// const { generateQRCode } = require('../../qrcode');
const { Seance, Joueur } = require('../../models');

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
   updateLastActivity: async (req, res) => {
      const { joueur_id } = req.params;
      try {
         const updatedJoueur = await Joueur.update(
            { derniere_activite: new Date() },
            { where: { id: joueur_id } },
         );
         res.status(200).json({ success: true, updatedJoueur });
      } catch (error) {
         res.status(500).json({ success: false, error: error.message });
      }
   },
};

module.exports = qrcodeController;
