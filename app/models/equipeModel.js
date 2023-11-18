const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Categorie = require('./categorieModel');
const Seance = require('./seanceModel');
const Coach = require('./coachModel');
const Joueur = require('./joueurModel');

class Equipe extends Model {}

Equipe.init(
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
    },
    {
        sequelize,
        modelName: 'Equipe',
    },
);

// Relation avec la catégorie
Equipe.belongsTo(Categorie, {
    foreignKey: {
        allowNull: false,
    },
});

// Relation avec les séances
Equipe.hasMany(Seance);

// Relation avec les joueurs
Equipe.belongsToMany(Joueur, { through: 'Presences' });

// Relation avec les coachs
Equipe.belongsToMany(Coach, { through: 'coaches_equipes' });

module.exports = Equipe;
