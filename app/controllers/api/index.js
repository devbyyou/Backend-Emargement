const coachesControllers = require('./coachesControllers');
const logoutControllers = require('./logoutControllers');

const apiController = {
    home(req, res) {
        return res.json({
            message: 'Welcome to the API!',
        });
    },
};

module.exports = { apiController, coachesControllers, logoutControllers };
