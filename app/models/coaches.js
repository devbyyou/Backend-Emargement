const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Coaches extends Model {}

Coaches.init(
   {
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
         unique: true,
      },
      tel: {
         type: DataTypes.STRING,
      },
      role: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      date_creation: {
         type: DataTypes.DATE,
      },
      last_activity: {
         type: DataTypes.DATE,
      },
      logo: {
         type: DataTypes.STRING,
      },
      statut: {
         type: DataTypes.STRING,
      },
      session_id: {
         type: DataTypes.STRING,
      },
      equipe_id: {
         type: DataTypes.INTEGER,
      },
      banniere: {
         type: DataTypes.INTEGER,
      },
   },
   {
      sequelize,
      modelName: 'coaches',
      tableName: 'coaches', // Nom de la table dans la base de données
      createdAt: 'created_at',
      updatedAt: 'updated_at',
   },
);

module.exports = Coaches;
