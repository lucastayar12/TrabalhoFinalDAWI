const db = require('../../src/configs/sequelize');
const { Model, DataTypes } = db.Sequelize;
const sequelize = db.sequelize;

class Admin extends Model { }

Admin.init({
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize, modelName: 'users'})

module.exports = Admin;