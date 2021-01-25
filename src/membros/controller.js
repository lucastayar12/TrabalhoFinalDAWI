const db = require('./../configs/sequelize')
const Membro = require('../membros/model')

exports.criaMembro = (req,res) => {
    Membro.create({
        nome: req.body.nome,
        cargo: req.body.cargo,
        img: req.body.img
    }).then((data) => {
        res.send(data);
    }).catch((err) =>{
        console.log('Erro: ' + err);
    })
}

exports.lista = (req,res) => {
    Membro.findAll().then(data => {
        console.log(data)
        res.send(data)
    }).catch((err) => {
        console.log("Dado não encontrado!" + err)
    })
}

exports.delete = (req, res) => {
    Membro.destroy({
        where: {
            id: req.body.id
        }
    }).then((affectedRows) => {
        res.send({ 'message': 'ok', 'affectedRows': affectedRows });
    })
}

exports.update = (req, res) => {
    Membro.update(
        {
            nome: req.body.nome,
            cargo: req.body.cargo,
            img: req.body.img,
        },
        {
            where: {
                id: req.body.id
            }
        }
    ).then((registro) => {
        console.log("Dado achado!");
        res.send(registro);
    }).catch((err) => {
        console.log("Erro: " + err);
    })
}

exports.consultaId = (req, res) => {

    Membro.findOne({
        where: {
            id: req.body.id,
        }
    }).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log("Dado não encontrado! " + err)
    })
}