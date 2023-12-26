const { CoachesEquipes } = require('./app/models');
// Utilisez CoachesEquipes comme nécessaire dans votre logique
CoachesEquipes.findAll().then((result) => {
   console.log(result);
});
