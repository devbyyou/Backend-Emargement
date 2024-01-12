/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
// controllers/api/presenceController.js
const {
   Presence, Absence, Retard, Joueur,
} = require('../../models');
const HistoriquePresence = require('../../models/historiquePresenceModel');
const { notificationService } = require('../../services/notificationService');

const presenceController = {
   // Obtient la liste des joueurs présents à une séance
   getPresences: async (req, res) => {
      // console.log('req is -------->', req);
      try {
         const { seance_id } = req.params;
         // console.log('equipeId seanceId is -------->', seance_id);

         const presences = await Presence.findAll({ where: { seance_id } });
         // console.log('presences is -------->', presences);
         res.json(presences);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },
   // Enregistre la présence d'un joueur à une séance
   recordPresence: async (req, res) => {
      // const { joueurId, seanceId } = req.params;
      const {
         joueurId, seanceId, statut, absence, retard,
      } = req.body;
      // console.log('lelog ------------------>', joueurId, seanceId, statut, absence, retard);
      try {
         // Mettre à jour la colonne derniere_activite du joueur
         await Joueur.update(
            { derniere_activite: new Date() },
            { where: { id: joueurId } },
         );
         const presence = await Presence.create({
            joueur_id: joueurId,
            seance_id: seanceId,
            statut,
            absence,
            retard,
         });
         res.status(200).json({ success: true, presence });
      } catch (error) {
         res.status(500).json({ success: false, error: error.message });
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
