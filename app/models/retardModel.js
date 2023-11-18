const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Retard extends Model {}

Retard.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        joueur_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'joueurs',
                key: 'id',
            },
        },
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
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Retard',
        tableName: 'retards',
        timestamps: false, // Vous pouvez définir cela à true si vous
        // voulez des timestamps créés automatiquement
        underscored: true,
    },
);

module.exports = Retard;
