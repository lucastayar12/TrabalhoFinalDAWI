module.exports = (app) => {
    const controller = require('../admin/controller');

    //Entra
    app.post('/admin', controller.entrar)
    
    //Cria Admin
    app.get('/login', controller.cria)
     }