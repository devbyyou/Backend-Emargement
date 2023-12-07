const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Equipes extends Model {}

Equipes.init(
    {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logo: {
            type: DataTypes.STRING,
        },
        statut: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categorieId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories', // Nom de la table référencée
                key: 'id', // Nom de la colonne référencée
            },
        },
    },
    {
        sequelize,
        tableName: 'equipes',
        modelName: 'equipes',
    },
);

module.exports = Equipes;
