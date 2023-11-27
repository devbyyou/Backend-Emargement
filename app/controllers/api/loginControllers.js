const authService = require('../../services/authService');

const loginControllers = {

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const token = await authService.authenticateUser(email, password);
            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: 'Invalid credentials' });
        }
    },

    inscription: async (req, res) => {
        try {
            const {
                prenom, nom, tel, email, password, role,
            } = req.body;
            console.log('le log controler', email);
            const token = await authService.registerUser({
                prenom, nom, tel, email, password, role,
            });
            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: 'Invalid credentials' });
        }
    },
};

module.exports = loginControllers;
