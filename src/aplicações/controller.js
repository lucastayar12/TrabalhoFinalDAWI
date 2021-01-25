const db = require('./../configs/sequelize')
const Aplicar = require('../aplicações/model')

exports.aplica = (req, res) => {
    Aplicar.create({
        familia: req.body.familia,
        discord: req.body.discord
    }).then((data) => {
        res.send(data);
    })
}

exports.lista = (req,res) => {
    Aplicar.findAll().then(data => {
        console.log(data)
        res.send(data)
    }).catch((err) => {
        console.log("Dado não encontrado!" + err)
    })
}

exports.delete = (req, res) => {
    Aplicar.destroy({
        where: {
            id: req.body.id
        }
    }).then((affectedRows) => {
        res.send({ 'message': 'ok', 'affectedRows': affectedRows });
    })
}
