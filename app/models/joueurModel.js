const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Joueur extends Model {}

Joueur.init(
   {
      // joueurId: {
      //    type: DataTypes.STRING,
      //    allowNull: false,
      //    unique: true,
      // },
      nom: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      prenom: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true, // Assurez-vous que l'email est unique
         validate: {
            isEmail: true, // Assurez-vous que c'est une adresse email valide
         },
      },
      tel: {
         type: DataTypes.STRING(15),
      },
      derniere_activite: {
         type: DataTypes.DATE,
      },
      // date_creation: {
      //    type: DataTypes.DATE,
      //    allowNull: false,
      // },
      statut: {
         type: DataTypes.STRING(15),
      },
      logo: {
         type: DataTypes.STRING,
      },
      nom_prenom_tel_parent: {
         type: DataTypes.STRING,
      },
      // total_presence: {
      //    type: DataTypes.INTEGER,
      // },
      // mot_de_passe: {
      //    type: DataTypes.STRING,
      //    allowNull: false,
      // },
      // role: {
      //    type: DataTypes.STRING(15),
      // },
      age: {
         type: DataTypes.INTEGER,
      },
      // etat: {
      //    type: DataTypes.STRING(15),
      // },
      // nombre_total_joueur: {
      //    type: DataTypes.INTEGER,
      // },
      // session_id: {
      //    type: DataTypes.STRING,
      // },
      categorie_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      equipe_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   },
   {
      sequelize,
      modelName: 'Joueur',
      tableName: 'joueurs',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
   },
);

module.exports = Joueur;
