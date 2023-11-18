const coachesControllers = require('./coachesControllers');

const apiController = {
    home(req, res) {
        return res.json({
            message: 'Welcome to the API!',
        });
    },
};

module.exports = { apiController, coachesControllers };
