const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class coachesEquipes extends Model {}

coachesEquipes.init(
    {
        coach_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'coaches',
                key: 'id',
            },
        },
        equipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'equipes',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        // modelName: 'Coach',
        tableName: 'coaches_equipes', // Nom de la table dans la base de données
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

module.exports = coachesEquipes;
