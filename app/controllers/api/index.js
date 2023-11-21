const coachesControllers = require('./coachesControllers');
const logoutControllers = require('./logoutControllers');
const joueursControllers = require('./joueursControllers');
const equipeController = require('./equipeController');
const seancesController = require('./seancesController');
const presenceController = require('./presenceController');
const categoriesController = require('./categoriesController');

const apiController = {
    home(req, res) {
        return res.json({
            message: 'Welcome to the API!',
        });
    },
};

module.exports = {
    apiController,
    coachesControllers,
    logoutControllers,
    joueursControllers,
    equipeController,
    seancesController,
    presenceController,
    categoriesController,
};
