// controllers/api/presenceController.js

const { Presence, Absence, Retard } = require('../../models');
const HistoriquePresence = require('../../models/historiquePresenceModel');
const { notificationService } = require('../../services/notificationService');

const presenceController = {
   // Obtient la liste des joueurs présents à une séance
   getPresences: async (req, res) => {
      try {
         const { id: equipeId, seanceId } = req.params;
         const presences = await Presence.findAll({ where: { equipeId, seanceId } });
         res.json(presences);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   // Enregistre la présence d'un joueur à une séance
   recordPresence: async (req, res) => {
      try {
         const { id: equipeId, seanceId } = req.params;
         const { joueurId } = req.body;
         const newPresence = await Presence.create({ equipeId, seanceId, joueurId });
         res.status(201).json(newPresence);
      } catch (error) {
         res.status(400).json({ error: error.message });
      }
   },

   // Marque un joueur comme absent à une séance
   markAbsent: async (req, res) => {
      try {
         const { id: equipeId, seanceId, joueurId } = req.params;
         await Presence.destroy({ where: { equipeId, seanceId, joueurId } });
         res.json({ message: 'Joueur marqué comme absent avec succès.' });
      } catch (error) {
         res.status(400).json({ error: error.message });
      }
   },
   // Enregistre l'absence d'un joueur à une séance
   recordAbsence: async (req, res) => {
      try {
         const { id: equipeId, seanceId } = req.params;
         const { joueurId } = req.body;

         // Marquer le joueur comme absent dans la présence actuelle
         await Presence.create({
            equipeId, seanceId, joueurId, absence: true,
         });

         // Enregistrez également l'absence dans la table des absences
         await Absence.create({ joueur_id: joueurId, date: new Date(), statut: 'Absent' });

         // Enregistrez l'absence dans l'historique des présences
         await HistoriquePresence.create({
            joueur_id: joueurId,
            date: new Date(),
            presence: false,
            absence: true,
            retard: false,
         });

         // Envoyer une notification aux entraîneurs ou responsables concernés
         const message = `L'absence de joueur ${joueurId} à la séance ${seanceId} a été enregistrée.`;
         notificationService.sendNotificationToConcernedUsers(equipeId, message);

         res.status(201).json({ message: 'Absence enregistrée avec succès.' });
      } catch (error) {
         res.status(400).json({ error: error.message });
      }
   },

   // Enregistre le retard d'un joueur à une séance
   recordRetard: async (req, res) => {
      try {
         const { id: equipeId, seanceId } = req.params;
         const { joueurId } = req.body;

         // Marquer le joueur comme en retard dans la présence actuelle
         await Presence.create({
            equipeId, seanceId, joueurId, retard: true,
         });

         // Enregistrez également le retard dans la table des retards
         await Retard.create({ joueur_id: joueurId, date: new Date(), statut: 'En retard' });

         // Enregistrez le retard dans l'historique des présences
         await HistoriquePresence.create({
            joueur_id: joueurId,
            date: new Date(),
            presence: false,
            absence: false,
            retard: true,
         });

         // Envoyer une notification aux entraîneurs ou responsables concernés
         const message = `Le retard de joueur ${joueurId} à la séance ${seanceId} a été enregistré.`;
         notificationService.sendNotificationToConcernedUsers(equipeId, message);

         res.status(201).json({ message: 'Retard enregistré avec succès.' });
      } catch (error) {
         res.status(400).json({ error: error.message });
      }
   },
};

module.exports = presenceController;
