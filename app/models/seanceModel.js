const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
// const Equipe = require('./equipeModel');

class Seance extends Model {}

Seance.init(
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
    },
    {
        sequelize,
        modelName: 'Seance',
    },
);

// Définir les associations
// Seance.belongsTo(Equipe);

module.exports = Seance;
