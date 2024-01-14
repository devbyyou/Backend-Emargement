const express = require('express');
const { coachesControllers } = require('../../controllers/api');
// const validateController = require('../../controllers/api/validateController');
// const authorize = require('../../middlewares/authorize');
// const roles = require('../../roles');
// const authenticateToken = require('../../middlewares/authenticateToken');
// const upload = require('../../middlewares/multerLocal');

const router = express.Router();

router.route('/')
   .put(
      // authorize(roles.ENTRAINEUR.toLowerCase()),
      // validateController.validateTeam,
      //   upload.single('logo'),
      coachesControllers.updateCoachBanniere,
   );

module.exports = router;
