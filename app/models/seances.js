const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Seances extends Model {}

Seances.init(
   {
      date: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      heure: {
         type: DataTypes.TIME,
         allowNull: false,
      },
      lieu: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      statut: {
         type: DataTypes.ENUM('planifiee', 'terminee'),
         defaultValue: 'planifiee',
      },
      horaire: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      equipe_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      categorie_id: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },

   },
   {
      sequelize,
      // modelName: 'Seances',
      tableName: 'seances',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
   },
);

module.exports = Seances;
