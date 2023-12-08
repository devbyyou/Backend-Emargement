const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const {
    Coaches, Equipes, Joueur, Categories,
} = require('../models');
const roles = require('../roles');

const generateToken = (user) => {
    const payload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        // timestamp: Date.now(),
    };

    const options = {
        expiresIn: '1s',
    };

    return jwt.sign(payload, config.secretKey, options);
};

const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (inputPassword, hashedPassword) => {
    try {
        // Format pour facilité la comparaison des mdp stocké en non hashé
        // !REMPLACER EN CAS DE PROD REEL PAR :
        // return await bcrypt.compare(inputPassword, hashedPassword);
        if (inputPassword === hashedPassword) {
            return await (inputPassword, hashedPassword);
        }
    } catch (error) {
        throw new Error('Erreur lors de la comparaison des mots de passe.');
    }
};

const registerUser = async (userData) => {
    const {
        prenom, nom, tel, email, password, role,
    } = userData;
    console.log('le log userdata', userData);

    console.log('log', prenom, nom, tel, email, password, role);
    const existingUser = await Coaches.findOne({ where: { email } });

    if (existingUser) {
        throw new Error('Cet utilisateur existe déjà.');
    }

    if (!Object.values(roles).includes(role)) {
        throw new Error('Rôle d\'utilisateur non valide.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Coaches.create({
        nom,
        prenom,
        tel,
        email,
        password: hashedPassword,
        role,
    });

    return newUser;
};

const authenticateUser = async (email, password) => {
    const user = await Coaches.findOne(
        {
            where: {
                email,
            },
            include: {
                model: Equipes,
                as: 'equipes',
                attributes: ['id', 'nom', 'logo', 'statut', 'categorie_id'],
                include: [
                    {
                        model: Joueur,
                        as: 'joueurs',
                        attributes: ['id', 'nom', 'prenom', 'email'],
                    },
                    {
                        model: Categories,
                        as: 'Categories',
                        attributes: ['id', 'nom', 'tranche_age', 'nombre_total'],
                    },
                ],
            },
        },
    );
    // console.log(user);
    if (!user) {
        throw new Error('Utilisateur non trouvé.');
    }

    const isValidPassword = await comparePasswords(password, user.password);

    console.log('log', password, user.password);
    if (!isValidPassword) {
        throw new Error('Mot de passe incorrect.');
    }

    const token = generateToken(user);

    return { token, user };
};

module.exports = {
    generateToken,
    hashPassword,
    comparePasswords,
    registerUser,
    authenticateUser,
};
