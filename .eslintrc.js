module.exports = {
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        indent: ['error', 3],
        'consistent-return': 'off',
    },
};
