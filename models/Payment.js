const sequelize = require('sequelize');
const connection = require('../database/connection');

const Payment = connection.define('payment', {
    title: { 
        type: sequelize.STRING,
        allowNull: false
    },
    value: { 
        type: sequelize.DECIMAL,
        allowNull: false
    },
    date_payment: { 
        type: sequelize.DATEONLY,
        allowNull: false
    },
    tax: { 
        type: sequelize.DECIMAL,
        allowNull: false
    },
    comments: { 
        type: sequelize.TEXT,
        allowNull: true
    },
});

//Payment.sync({force: false});

module.exports = Payment;