const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const { Coach } = require('../models');
const roles = require('../roles');

const generateToken = (user) => {
    const payload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        logged: true,
    };

    const options = {
        expiresIn: '1h',
    };

    return jwt.sign(payload, config.secretKey, options);
};

const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (inputPassword, hashedPassword) => {
    try {
        // console.log(inputPassword, hashedPassword);
        return await bcrypt.compare(inputPassword, hashedPassword);
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
    const existingUser = await Coach.findOne({ where: { email } });

    if (existingUser) {
        throw new Error('Cet utilisateur existe déjà.');
    }
    // Assurez-vous que le rôle est valide
    if (!Object.values(roles).includes(role)) {
        throw new Error('Rôle d\'utilisateur non valide.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Coach.create({
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
    const user = await Coach.findOne({ where: { email } });

    if (!user) {
        throw new Error('Utilisateur non trouvé.');
    }

    const isValidPassword = await comparePasswords(password, user.password);

    console.log('log', password, user.password);
    if (!isValidPassword) {
        throw new Error('Mot de passe incorrect.');
    }

    const token = generateToken(user);

    return { user, token };
};

module.exports = {
    generateToken,
    hashPassword,
    comparePasswords,
    registerUser,
    authenticateUser,
};
