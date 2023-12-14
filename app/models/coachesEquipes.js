const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Coaches = require('./coaches');
const Equipes = require('./equipes');

class CoachesEquipes extends Model {}

CoachesEquipes.init(
    {
        coach_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Coaches,
                key: 'id',
            },
        },
        equipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Equipes,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        // modelName: 'CoachesEquipes',
        tableName: 'coaches_equipes', // Nom de la table dans la base de données
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

module.exports = CoachesEquipes;
