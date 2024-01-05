const Coaches = require('./coaches');
const Categories = require('./categories');
const Equipes = require('./equipes');
const Joueur = require('./joueurModel');
const Seances = require('./seances');
const Absence = require('./absenceModel');
const Retard = require('./retardModel');
const Presence = require('./presenceModel');
const CoachesEquipes = require('./coachesEquipes');

CoachesEquipes.belongsTo(Coaches, { foreignKey: 'coach_id', onDelete: 'CASCADE' });
CoachesEquipes.belongsTo(Equipes, { foreignKey: 'equipe_id', onDelete: 'CASCADE' });

Coaches.belongsToMany(Equipes, {
   through: 'coaches_equipes',
   foreignKey: 'coach_id',
   otherKey: 'equipe_id',
   as: 'equipes',
});

Equipes.belongsToMany(Coaches, {
   through: 'coaches_equipes',
   foreignKey: 'equipe_id',
   otherKey: 'coach_id',
   as: 'coaches',
});

Equipes.belongsTo(Categories, {
   as: 'categories',
   foreignKey: 'categorie_id',
});
Categories.hasMany(Equipes, {
   as: 'categories',
   foreignKey: 'categorie_id',
});

// Modèle Joueur
Joueur.belongsToMany(Seances, { through: 'presences', foreignKey: 'joueur_id' });

// Modèle Equipes
Equipes.hasMany(Joueur, { as: 'joueurs', foreignKey: 'equipe_id' });
Equipes.hasMany(Seances, { foreignKey: 'equipe_id' });

// Modèle Seances
Seances.belongsTo(Equipes, { foreignKey: 'equipe_id' });
Seances.belongsToMany(Joueur, { through: 'presences', foreignKey: 'seance_id' });

Joueur.hasMany(Absence);
Absence.belongsTo(Joueur);

Joueur.hasMany(Retard);
Retard.belongsTo(Joueur);

Joueur.hasMany(Presence);
Presence.belongsTo(Joueur);

module.exports = {
   Coaches,
   Categories,
   Equipes,
   Joueur,
   Seances,
   Retard,
   Absence,
   Presence,
   CoachesEquipes,
};
