const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Joueur = require('./joueurModel');
const Seance = require('./seances');

class Presence extends Model {}

Presence.init(
   {
      statut: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      joueur_id: {
         type: DataTypes.INTEGER,
         references: {
            model: Joueur,
            key: 'id',
         },
         allowNull: false,
      },
      seance_id: {
         type: DataTypes.INTEGER,
         references: {
            model: Seance,
            key: 'id',
         },
         allowNull: false,
      },
      absence: {
         type: DataTypes.STRING,
         defaultValue: false,
      },
      retard: {
         type: DataTypes.STRING,
         defaultValue: false,
      },

      created_at: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
         allowNull: false,
      },
      updated_at: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
         allowNull: false,
      },
   },
   {
      sequelize,
      modelName: 'Presence',
      timestamps: true,
      updatedAt: 'updated_at',
      createdAt: 'created_at',
   },
);

// Ajoutez les relations avec les autres modèles
Presence.belongsTo(Joueur, { foreignKey: 'joueur_id' });
Presence.belongsTo(Seance, { foreignKey: 'seance_id' });

module.exports = Presence;
