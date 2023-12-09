const Coaches = require('./coaches');
const Categories = require('./categories');
const Equipes = require('./equipes');
const Joueur = require('./joueurModel');
const Seance = require('./seanceModel');
const Absence = require('./absenceModel');
const Retard = require('./retardModel');
const Presence = require('./presenceModel');

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

Joueur.belongsToMany(Equipes, { through: Seance });
Equipes.hasMany(Joueur, { as: 'joueurs', foreignKey: 'equipe_id' });
Seance.belongsTo(Equipes);
Equipes.hasMany(Seance);

Joueur.belongsToMany(Seance, { through: 'presence' });
Seance.belongsToMany(Joueur, { through: 'presence' });

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
    Seance,
    Retard,
    Absence,
    Presence,
};
