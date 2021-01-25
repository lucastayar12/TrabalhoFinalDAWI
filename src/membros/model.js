const db = require('../../src/configs/sequelize');
const { Model, DataTypes } = db.Sequelize;
const sequelize = db.sequelize;

class Membro extends Model { }

Membro.init({
    nome: {
        type: DataTypes.STRING
    },
    cargo: {
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.STRING(9999999)
    }
}, {sequelize, modelName: 'members'})

module.exports = Membro;