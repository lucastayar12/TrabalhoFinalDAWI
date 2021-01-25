const db = require('./../configs/sequelize')
const Admin = require('../admin/model')

exports.cria = (req,res) => {
    Admin.create({
        id: '1',
        login: 'root',
        password: 'root'
    }).then((data) => {
        res.render('loginadm');
    }).catch((err) =>{
        res.render('loginadm')
        console.log('Erro: ' + err);
    })
}
    
exports.entrar = (req, res) => {
    Admin.findOne({
        where:{
            login: req.query.login,
            password: req.query.password
        }
    }).then(() => {
        res.render('admprincipal')
    }).catch((err) =>{
        console.log('Erro: Pq passas aqui' + err);
    })
}