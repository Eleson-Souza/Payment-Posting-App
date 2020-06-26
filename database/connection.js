const sequelize = require('sequelize');

const connection = new sequelize('db_payment_posting', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;