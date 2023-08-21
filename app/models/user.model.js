const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');


const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
});

module.exports = User;