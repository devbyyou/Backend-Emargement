const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Coach extends Model {}

Coach.init(
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
        mot_de_passe: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_creation: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        last_activity: {
            type: DataTypes.DATE,
        },
        logo: {
            type: DataTypes.STRING,
        },
        statut: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        session_id: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Coach',
        tableName: 'coaches', // Nom de la table dans la base de données
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

module.exports = Coach;
