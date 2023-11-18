const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Categorie extends Model {}

Categorie.init(
    {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_creation: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        statut: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tranche_age: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombre_total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Categorie',
        tableName: 'categories', // Assurez-vous que le nom de la table correspond à votre base de données
        timestamps: true, // Mettez à true si vous avez created_at et updated_at dans votre table
        underscored: true, // Mettez à true si vous utilisez snake_case au lieu de camelCase
    },
);

module.exports = Categorie;
