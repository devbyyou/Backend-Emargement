const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const {
   Coaches, Equipes, Joueur, Categories,
} = require('../models');
const roles = require('../roles');

const generateToken = (user) => {
   const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      // timestamp: Date.now(),
   };

   const options = {
      expiresIn: '1h',
   };

   return jwt.sign(payload, config.secretKey, options);
};

const hashPassword = async (password) => {
   const saltRounds = 10;
   return bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (inputPassword, hashedPassword) => {
   try {
      // Format pour facilité la comparaison des mdp stocké en non hashé
      // !REMPLACER EN CAS DE PROD REEL PAR :
      // return await bcrypt.compare(inputPassword, hashedPassword);
      if (inputPassword === hashedPassword) {
         return await (inputPassword, hashedPassword);
      }
   } catch (error) {
      throw new Error('Erreur lors de la comparaison des mots de passe.');
   }
};

const registerUser = async (userData) => {
   const {
      prenom, nom, tel, email, password, role,
   } = userData;

   const existingUser = await Coaches.findOne({ where: { email } });

   if (existingUser) {
      throw new Error('Cet utilisateur existe déjà.');
   }

   if (!Object.values(roles).includes(role)) {
      throw new Error('Rôle d\'utilisateur non valide.');
   }
   const hashedPassword = await bcrypt.hash(password, 10);

   const newUser = await Coaches.create({
      nom,
      prenom,
      tel,
      email,
      password: hashedPassword,
      role,
   });

   return newUser;
};

const authenticateUser = async (email, password) => {
   const user = await Coaches.findOne(
      {
         where: {
            email,
         },
         include: {
            model: Equipes,
            as: 'equipes',
            attributes: ['id', 'nom', 'logo', 'statut', 'categorie_id'],
            include: [
               {
                  model: Joueur,
                  as: 'joueurs',
                  attributes: ['id', 'nom', 'prenom', 'email', 'derniere_activite'],
               },
               {
                  model: Categories,
                  as: 'categories',
                  attributes: ['id', 'nom', 'tranche_age', 'nombre_total'],
               },
            ],
         },
      },
   );
   const joueur = await Joueur.findOne({
      where: {
         email,
      },
   });

   if (!user && !joueur) {
      throw new Error('Utilisateur non trouvé.');
   }

   if (user) {
      const isValidPasswordCoach = await comparePasswords(password, user.password);
      if (!isValidPasswordCoach) {
         throw new Error('Mot de passe du coach incorrect.');
      }
   }
   if (joueur) {
      const isValidPasswordJoueur = await comparePasswords(password, joueur.password);
      if (!isValidPasswordJoueur) {
         throw new Error('Mot de passe du joueur incorrect.');
      }
   }

   const token = generateToken(user || joueur);

   return { token, user, joueur };
};

module.exports = {
   generateToken,
   hashPassword,
   comparePasswords,
   registerUser,
   authenticateUser,
};
