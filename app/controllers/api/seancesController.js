/* eslint-disable camelcase */
const { format } = require('date-fns');
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

      try {
         const newSeance = await Seances.create({
            equipe_id,
            categorie_id,
            statut: statut || 'planifiee',
            lieu: `${adresse} ${ville}`,
            date: formattedDate,
            heure: formattedHeure,
         }, {
            fields: ['equipe_id', 'categorie_id', 'statut', 'lieu', 'date', 'heure'],
         });

         res.status(201).json(newSeance);
      } catch (error) {
         res.status(400).json({ error: error.message });
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
