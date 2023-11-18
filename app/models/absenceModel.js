const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Absence extends Model {}

Absence.init(
    {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        heure: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        statut: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Ajoutez la clé étrangère pour référencer le joueur
        joueur_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'joueurs',
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Absence',
        tableName: 'absences', // Précisez le nom de la table
    },
);

module.exports = Absence;
