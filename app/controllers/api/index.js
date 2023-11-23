const coachesControllers = require('./coachesControllers');
const logoutControllers = require('./logoutControllers');
const joueursControllers = require('./joueursControllers');
const equipeController = require('./equipeController');
const seancesController = require('./seancesController');
const presenceController = require('./presenceController');
const categoriesController = require('./categoriesController');
const qrcodeController = require('./qrcodeController');
const { validateBody } = require('../../middlewares/validationMiddleware');
const { coachSchema, playerSchema } = require('../../validation');

const apiController = {
    home(req, res) {
        return res.json({
            message: 'Welcome to the API!',
        });
    },
};

coachesControllers.createCoach = [validateBody(coachSchema), coachesControllers.createCoach];
joueursControllers.postJoueur = [validateBody(playerSchema), joueursControllers.postJoueur];
joueursControllers.postJoueur = [validateBody(playerSchema), joueursControllers.postJoueur];
// suites des validations

module.exports = {
    apiController,
    coachesControllers,
    logoutControllers,
    joueursControllers,
    equipeController,
    seancesController,
    presenceController,
    categoriesController,
    qrcodeController,
};
