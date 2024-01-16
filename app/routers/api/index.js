const express = require('express');
const authenticateToken = require('../../middlewares/authenticateToken');
const { apiController } = require('../../controllers/api');
const coachRouter = require('./coach');
const logoutRouter = require('./logout');
const loginRouter = require('./login');
const inscriptionRouter = require('./inscription');
const joueursRouter = require('./joueurs');
const equipesRouter = require('./equipes');
const seancesRouter = require('./seances');
const presenceRouter = require('./presence');
const categoriesRouter = require('./categories');
const qrcodeRouter = require('./qrcode');
const coachLogoRouter = require('./coachLogoRouter');
const coachBanniereRouter = require('./coachBanniereRouter');

const router = express.Router();

router.all('/', apiController.home);

router.use('/logout', authenticateToken, logoutRouter);
router.use('/login', loginRouter);
router.use('/inscription', inscriptionRouter);
router.use('/coaches', authenticateToken, coachRouter);
router.use('/coaches/:id/logo', authenticateToken, coachLogoRouter);
router.use('/coaches/:id/banniere', authenticateToken, coachBanniereRouter);
router.use('/joueurs', authenticateToken, joueursRouter);
router.use('/player', authenticateToken, joueursRouter);
router.use('/equipes', authenticateToken, equipesRouter);
router.use('/seances', authenticateToken, seancesRouter);
router.use('/categories', categoriesRouter);
router.use('/update-last-activity', authenticateToken, qrcodeRouter);
router.use('/presences', authenticateToken, presenceRouter);

router.use((req, res) => {
   res.status(404).send('Service does not exists\nSee : https://doc.localhost.api');
});

module.exports = router;
