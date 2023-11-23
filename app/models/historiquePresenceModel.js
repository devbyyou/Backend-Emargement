const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class HistoriquePresence extends Model {}

HistoriquePresence.init(
    {
        joueur_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        presence: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        absence: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        retard: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'HistoriquePresence',
        tableName: 'historique_presences',
    },
);

module.exports = HistoriquePresence;
