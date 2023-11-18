const Coach = require('./coachModel');
const Categorie = require('./categorieModel');
const Equipe = require('./equipeModel');
const Joueur = require('./joueurModel');
const Seance = require('./seanceModel');
const Absence = require('./absenceModel');
const Retard = require('./retardModel');
const Presence = require('./presenceModel');

// Définissez ici les relations entre les modèles
Coach.belongsToMany(Equipe, { through: 'coaches_equipes' });
Equipe.belongsToMany(Coach, { through: 'coaches_equipes' });

Equipe.belongsTo(Categorie);
Categorie.hasMany(Equipe);

Equipe.belongsToMany(Joueur, { through: Seance });
Joueur.belongsToMany(Equipe, { through: Seance });

Seance.belongsTo(Equipe);
Equipe.hasMany(Seance);

Joueur.belongsToMany(Seance, { through: 'presence' });
Seance.belongsToMany(Joueur, { through: 'presence' });

Joueur.hasMany(Absence);
Absence.belongsTo(Joueur);

Joueur.hasMany(Retard);
Retard.belongsTo(Joueur);

Joueur.hasMany(Presence);
Presence.belongsTo(Joueur);

// ... Ajoutez d'autres relations selon vos besoins

module.exports = {
    Coach,
    Categorie,
    Equipe,
    Joueur,
    Seance,
    Retard,
    Absence,
    Presence,
    // ... Ajoutez d'autres modèles selon vos besoins
};
