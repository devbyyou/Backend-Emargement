const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Joueur extends Model {}

Joueur.init(
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
            type: DataTypes.STRING(15),
        },
        derniere_activite: {
            type: DataTypes.DATE,
        },
        date_creation: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        statut: {
            type: DataTypes.STRING(15),
        },
        logo: {
            type: DataTypes.STRING,
        },
        nom_prenom_tel_parent: {
            type: DataTypes.STRING,
        },
        total_presence: {
            type: DataTypes.INTEGER,
        },
        mot_de_passe: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(15),
        },
        age: {
            type: DataTypes.INTEGER,
        },
        etat: {
            type: DataTypes.STRING(15),
        },
        nombre_total_joueur: {
            type: DataTypes.INTEGER,
        },
        session_id: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Joueur',
    },
);

module.exports = Joueur;
