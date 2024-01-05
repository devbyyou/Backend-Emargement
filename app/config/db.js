const { Sequelize } = require('sequelize');
// const models = require('./models');

const sequelize = new Sequelize({
   dialect: 'postgres',
   host: process.env.PGHOST,
   port: process.env.PGPORT,
   username: process.env.PGUSER,
   password: process.env.PGPASSWORD,
   database: process.env.PGDATABASE,
   define: {
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
   },
});

module.exports = sequelize;
