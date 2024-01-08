/* eslint-disable camelcase */
const { format } = require('date-fns');
const QRCode = require('qrcode');
// const fs = require('fs');
// const path = require('path');
const { Seances } = require('../../models');

const seancesController = {
   getAll: async (req, res) => {
      try {
         const seances = await Seances.findAll();
         res.json(seances);
      } catch (error) {
         res.status(500).json(error);
      }
   },

   getOne: async (req, res) => {
      const { id, seanceId } = req.params;

      try {
         const seance = await Seances.findOne({ where: { id: seanceId, equipeId: id } });
         if (!seance) {
            return res.status(404).json({ message: 'Séance introuvable.' });
         }
         res.json(seance);
      } catch (error) {
         res.status(500).json(error);
      }
   },

   create: async (req, res) => {
      const {
         equipe_id, categorie_id, statut, adresse, ville, recurringDates,
      } = req.body;

      const formattedDate = format(recurringDates[0], 'yyyy-MM-dd');
      const formattedHeure = format(recurringDates[0], 'HH:mm:ss');
      // console.log(recurringDates[0]);
      const creneau = recurringDates[0];
      // console.log('leLog format(creneau) ', format(creneau));
      try {
         const newSeance = await Seances.create({
            equipe_id,
            categorie_id,
            statut: statut || 'planifiee',
            lieu: `${adresse}, ${ville}`,
            date: formattedDate,
            heure: formattedHeure,
            horaire: creneau,
         });
         // Générer le contenu du QR code avec les informations de la séance
         const qrCodeContent = JSON.stringify({
            seanceId: newSeance.id,
            equipe_id: newSeance.equipe_id,
            categorie_id: newSeance.categorie_id,
            statut: newSeance.statut,
            lieu: newSeance.lieu,
            date: newSeance.date,
            heure: newSeance.heure,
            horaire: newSeance.horaire,

         });
         // Générer le QR code et obtenir l'URL de l'image générée
         const qrCodeImageUrl = await QRCode.toDataURL(qrCodeContent);
         // Ajouter l'URL du QR code à la réponse
         newSeance.qrCodeImageUrl = qrCodeImageUrl;
         // Convertir l'image en base64
         const base64Image = qrCodeImageUrl.split(';base64,').pop();
         res.status(201).json({ seance: newSeance, qrCodeImage: base64Image });
      } catch (error) {
         res.status(400).json({ error: error.message });
         console.error('Erreur lors de la création de la séance :', error);
         // Gérer les erreurs spécifiques
         if (error.name === 'SequelizeValidationError') {
            // Les données de la séance ne sont pas valides
            res.status(400).json({ error: 'Données de séance non valides.' });
         } else if (error.name === 'SequelizeUniqueConstraintError') {
            // Une contrainte d'unicité a été violée
            res.status(400).json({ error: 'La séance existe déjà.' });
         } else {
            // Autres erreurs non prévues
            res.status(500).json({ error: 'Une erreur inattendue est survenue.' });
         }
      }
   },

   update: async (req, res) => {
      const { id, seanceId } = req.params;
      const { date, heure, lieu } = req.body;
      try {
         const seance = await Seances.findOne({ where: { id: seanceId, equipeId: id } });
         if (!seance) {
            return res.status(404).json({ message: 'Séance introuvable.' });
         }
         await seance.update({ date, heure, lieu });
         res.json(seance);
      } catch (error) {
         res.status(400).json({ error: error.message });
      }
   },

   delete: async (req, res) => {
      const { id, seanceId } = req.params;
      try {
         const seance = await Seances.findOne({ where: { id: seanceId, equipeId: id } });
         if (!seance) {
            return res.status(404).json({ message: 'Séance introuvable.' });
         }
         await seance.destroy();
         res.status(204).end();
      } catch (error) {
         res.status(500).json(error);
      }
   },
   // Récupérer la liste des séances d'entraînement passées
   getSeancesPassees: async (req, res) => {
      try {
         // Utilisez Sequelize pour récupérer les séances passées
         const seancesPassees = await Seances.findAll({
            where: {
               date: { $lt: new Date() }, // Sélections des séances passées
            },
            order: [['date', 'DESC']], // Tri par date décroissante
         });

         res.status(200).json(seancesPassees);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },
};

module.exports = seancesController;
