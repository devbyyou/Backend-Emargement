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
         // Assurez-vous que le middleware authorize a
         // ajouté les informations utilisateur à req.user
         const { user } = req;

         // Vérifiez si l'utilisateur a le rôle requis
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
         logo, tel, age,
         banniere, password, role,
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
               logo,
               tel,
               age,
               banniere,
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

   deleteCoach: async (req, res) => {
      try {
         const coach = await Coaches.findByPk(req.params.id);
         if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
         }

         // Supprimez le coach de la base de données
         await coach.destroy();

         res.json({ message: 'Coach deleted successfully' });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal Server Error' });
      }
   },

};

module.exports = coachesController;
