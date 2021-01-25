const db = require('../../src/configs/sequelize');
const { Model, DataTypes } = db.Sequelize;
const sequelize = db.sequelize;

class Aplicar extends Model { }

Aplicar.init({
    familia: {
        type: DataTypes.STRING
    },
    discord: {
        type: DataTypes.STRING
    }
}, {sequelize, modelName: 'aplicars'})

module.exports = Aplicar;