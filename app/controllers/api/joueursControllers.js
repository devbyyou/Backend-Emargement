/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');
// const { authService } = require('../../services/authService');
const {
   Joueur, Equipes, Categories,
} = require('../../models');

const JoueuresController = {
   getAll: async (req, res) => {
      try {
         const joueurs = await Joueur.findAll();
         res.json(joueurs);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },
   getOne: async (req, res) => {
      const { id } = req.params;
      try {
         const joueur = await Joueur.findByPk(id);
         if (!joueur) {
            return res.status(404).json({ message: 'Joueur introuvable.' });
         }
         res.json(joueur);
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },
   generateDefaultPassword: () => {
      const defaultPassword = 'MotDePasseParDefaut123';
      const saltRounds = 10;
      return bcrypt.hashSync(defaultPassword, saltRounds);
   },
   postJoueur: async (req, res) => {
      const {
         nom, prenom, email,
         logo, categorie_id,
         statut, tel, age,
         equipe_id,
      } = req.body;
      // const { id } = req.params;
      // const joueurId = `${equipe_id}_${id}`;
      try {
         // console.log('LE REQ.BODY------------------>', req.body);
         // console.log('LE REQ.params------------------>', req.params);
         const searchJoueur = await Joueur.findOne({
            where: { email },
         });
         // console.log('LE JOUEUR ----------->', searchJoueur);
         if (searchJoueur) {
            return res.status(404).json({ message: 'Joueur existe déjà' });
         }

         // Vérifier si la catégorie existe
         const categorieExists = await Categories.findByPk(categorie_id);
         if (!categorieExists) {
            return res.status(404).json({ message: 'La catégorie spécifiée n\'existe pas' });
         }

         // Vérifier si l'équipe existe
         const equipeExists = await Equipes.findByPk(equipe_id);
         if (!equipeExists) {
            return res.status(404).json({ message: 'L\'équipe spécifiée n\'existe pas' });
         }

         // const defaultPassword = JoueuresController.generateDefaultPassword();
         const defaultPassword = 'MotDePasseParDefaut123';

         const nouveauJoueur = await Joueur.create({
            nom,
            prenom,
            email,
            logo,
            categorie_id,
            equipe_id,
            statut,
            tel,
            age,
            password: defaultPassword,
            derniere_activite: new Date(),
            // joueurId: `${equipe_id}_${id}`,
            // id,
         });

         // Ajouter le joueur à l'ensemble des équipes associées à l'equipe
         const equipe = await Equipes.findByPk(equipe_id);
         if (equipe) {
            await equipe.addJoueur(nouveauJoueur);
         }
         const nouveauJoueurSansmdp = {
            nom: nouveauJoueur.nom,
            prenom: nouveauJoueur.prenom,
            email: nouveauJoueur.email,
            logo: nouveauJoueur.logo,
            categorie_id: nouveauJoueur.categorie_id,
            equipe_id: nouveauJoueur.equipe_id,
            statut: nouveauJoueur.statut,
            tel: nouveauJoueur.tel,
            age: nouveauJoueur.age,
            derniere_activite: nouveauJoueur.derniere_activite,
         };
         res.status(201).json(nouveauJoueurSansmdp);
      } catch (error) {
         // console.error(error.errors);
         res.status(400).json({ error: error.message });
      }
   },
   update: async (req, res) => {
      const {
         nom, prenom, email,
         logo, categorie_id,
         statut, tel, age,
         equipe_id,
      } = req.body;
      const { id } = req.params;
      try {
         const joueur = await Joueur.findByPk(id);
         if (!joueur) {
            res.status(404).json({ message: 'Joueur non trouvée.' });
         } else {
            await joueur.update({
               nom,
               prenom,
               email,
               logo,
               categorie_id,
               statut,
               tel,
               age,
               equipe_id,
               id,
            });
            res.status(201).json(joueur);
         }
      } catch (error) {
         res.status(400).json({ error: error.message });
      }
   },
   updating: async (req, res) => {
      const {
         nom, prenom, email,
         logo, tel, age,
         banniere, password, role,
      } = req.body;
      const { id } = req.params;
      try {
         const joueur = await Joueur.findByPk(id);
         if (!joueur) {
            res.status(404).json({ message: 'Joueur non trouvée.' });
         } else {
            await joueur.update({
               nom,
               prenom,
               email,
               logo,
               tel,
               age,
               banniere,
               password,
               role,
            });
            res.status(201).json(joueur);
         }
      } catch (error) {
         res.status(400).json({ error: error.message });
      }
   },
   delete: async (req, res) => {
      const { id } = req.params;
      try {
         const joueur = await Joueur.findByPk(id);
         if (!joueur) {
            return res.status(404).json({ message: 'Joueur introuvable.' });
         }
         await joueur.destroy();
         res.status(204).json({ message: `le joueurs ${joueur} avec l'id ${id} à été supprimé avec succès` });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },

};

module.exports = JoueuresController;
