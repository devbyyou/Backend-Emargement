/* eslint-disable camelcase */
// const roles = require('../../roles');
// const { authService } = require('../../services/authService');

const {
   Equipes, Coaches, Joueur, Categories, CoachesEquipes,
} = require('../../models');

const equipeController = {
   getAllEquipes: async (req, res) => {
      try {
         const equipes = await Equipes.findAll();
         res.json(equipes);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },
   getAllEquipesByUser: async (req, res) => {
      const { userId } = req.user;
      if (!userId) {
         return res.status(400).json({ error: 'Le paramètre userID est manquant.' });
      }
      try {
         // Utilisez Sequelize pour récupérer l'utilisateur et ses équipes associées
         const userWithEquipes = await Coaches.findByPk(userId, {
            include: {
               model: Equipes,
               as: 'equipes',
               include: [
                  {
                     model: Joueur,
                     as: 'joueurs',
                     attributes: ['created_at',
                        'id', 'nom', 'prenom', 'email',
                        'derniere_activite', 'categorie_id', 'age',
                        'logo', 'statut', 'tel'],
                  },
                  {
                     model: Categories,
                     as: 'categories',
                     attributes: ['id', 'nom', 'tranche_age', 'nombre_total'],
                  },
               ],
            },
         });

         if (!userWithEquipes) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
         }

         res.json(userWithEquipes.equipes);
      } catch (error) {
         // console.error(error);
         res.status(500).json({ error: 'Erreur serveur lors de la récupération des équipes.' });
      }
   },

   getEquipeById: async (req, res) => {
      const { id } = req.params;
      try {
         const equipe = await Equipes.findByPk(id);
         if (!equipe) {
            res.status(404).json({ message: 'Équipe non trouvée.' });
         } else {
            res.json(equipe);
         }
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

   createEquipe: async (req, res) => {
      const {
         nom, logo, categorie_id, statut,
      } = req.body;
      const coachId = req.user.userId;
      try {
         const newEquipe = await Equipes.create({
            nom,
            logo,
            categorie_id,
            statut,
            coachId,
         });
            // Ajouter l'équipe à l'ensemble des équipes associées à l'entraîneur
         const coach = await Coaches.findByPk(coachId);
         if (coach) {
            await coach.addEquipes(newEquipe);
         }
         res.status(201).json(newEquipe);
      } catch (error) {
         res.status(400).json({ error: error.message });
      }
   },

   updateEquipe: async (req, res) => {
      const { id } = req.params;
      const { userId } = req.user;
      const {
         nom, logo, categorieId, statut,
      } = req.body;
      try {
         const equipe = await Equipes.findByPk(id);
         if (!equipe) {
            res.status(404).json({ message: 'Équipe non trouvée.' });
         } else {
            await equipe.update({
               nom, logo, categorieId, statut,
            });
            const userWithEquipes = await Coaches.findByPk(userId, {
               include: {
                  model: Equipes,
                  as: 'equipes',
                  include: [
                     {
                        model: Joueur,
                        as: 'joueurs',
                        attributes: [
                           'id', 'nom', 'prenom', 'email',
                           'derniere_activite', 'categorie_id', 'age',
                           'logo', 'statut', 'tel'],
                     },
                     {
                        model: Categories,
                        as: 'categories',
                        attributes: ['id', 'nom', 'tranche_age', 'nombre_total'],
                     },
                  ],
               },
            });
            res.json(userWithEquipes.equipes);
         }
      } catch (error) {
         res.status(400).json({ error: error.message });
      }
   },

   deleteEquipe: async (req, res) => {
      const { id } = req.params;
      const { userId } = req.user;
      if (!userId) {
         return res.status(400).json({ error: 'Le paramètre userID est manquant.' });
      }
      try {
         // Supprimez d'abord les références dans la table coaches_equipes
         await CoachesEquipes.destroy({ where: { equipe_id: id } });

         // Ensuite, supprimez l'équipe
         const equipe = await Equipes.findByPk(id);

         if (!equipe) {
            res.status(404).json({ message: 'Équipe non trouvée.' });
         } else {
            await equipe.destroy();
            const userWithEquipes = await Coaches.findByPk(userId, {
               include: {
                  model: Equipes,
                  as: 'equipes',
                  include: [
                     {
                        model: Joueur,
                        as: 'joueurs',
                        attributes: [
                           'id', 'nom', 'prenom', 'email',
                           'derniere_activite', 'categorie_id', 'age',
                           'logo', 'statut', 'tel'],
                     },
                     {
                        model: Categories,
                        as: 'categories',
                        attributes: ['id', 'nom', 'tranche_age', 'nombre_total'],
                     },
                  ],
               },
            });
            res.status(200).json(userWithEquipes.equipes);
         }
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },
};

module.exports = equipeController;
