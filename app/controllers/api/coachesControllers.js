const { Coaches } = require('../../models');
const roles = require('../../roles');
const { authService } = require('../../services/authService');

const coachesController = {
   getAll: async (req, res) => {
      try {
         const coaches = await Coaches.findAll();
         res.json(coaches);
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal Server Error' });
      }
   },
   getById: async (req, res) => {
      const { id } = req.params;
      try {
         const coach = await Coaches.findByPk(id);
         if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
         }
         res.json(coach);
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal Server Error' });
      }
   },
   createCoach: async (req, res) => {
      try {
         const { user } = req;

         if (user.role !== roles.ENTRAINEUR) {
            return res.status(403).json({ message: 'Accès interdit. Rôle utilisateur incorrect.' });
         }
         const newUser = await authService.registerUser(req.body);
         res.status(201).json({ user: newUser });
      } catch (error) {
         console.error(error);
         res.status(400).json({ error: error.message });
      }
   },

   updateCoach: async (req, res) => {
      const {
         nom, prenom, email,
         tel, age,
         password, role,
      } = req.body;
      const { id } = req.params;
      try {
         const coach = await Coaches.findByPk(id);
         if (!coach) {
            res.status(404).json({ message: 'coach non trouvée.' });
         } else {
            await coach.update({
               nom,
               prenom,
               email,
               tel,
               age,
               password,
               role,
               id,
            });
            res.status(201).json(coach);
         }
      } catch (error) {
         res.status(400).json({ error: error.message });
      }
   },
   updateCoachBanniere: async (req, res) => {
      const {
         labanniere,
      } = req.body;
      const { userId } = req.user;
      try {
         const coach = await Coaches.findByPk(userId);
         if (!coach) {
            res.status(404).json({ message: 'coach non trouvée.' });
         } else {
            await coach.update({
               banniere: labanniere,
            });
            res.status(201).json(coach);
         }
      } catch (error) {
         res.status(400).json({ error: error.message });
      }
   },
   updateCoachLogo: async (req, res) => {
      const {
         lelogo,
      } = req.body;
      const { userId } = req.user;
      try {
         const coach = await Coaches.findByPk(userId);
         if (!coach) {
            res.status(404).json({ message: 'coach non trouvée.' });
         } else {
            await coach.update({
               logo: lelogo,
            });
            res.status(201).json(coach);
         }
      } catch (error) {
         res.status(400).json({ error: error.message });
      }
   },

   deleteCoach: async (req, res) => {
      try {
         const coach = await Coaches.findByPk(req.params.id);
         if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
         }
         await coach.destroy();

         res.json({ message: 'Coach deleted successfully' });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal Server Error' });
      }
   },

};

module.exports = coachesController;
