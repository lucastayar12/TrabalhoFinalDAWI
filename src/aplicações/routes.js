module.exports = (app) => {
    const controller = require('../aplicações/controller');

    app.post('/aplicase', controller.aplica);

    app.get('/admin/aplicacoes', controller.lista)

    app.delete('/admin/deletarA', controller.delete)
}