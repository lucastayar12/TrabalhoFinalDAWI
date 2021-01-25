module.exports = (app) => {
    const controller = require('../membros/controller');

    app.post('/admin/salvar', controller.criaMembro)

    app.get('/admin/listar', controller.lista)

    app.delete("/admin/deletar", controller.delete)

    app.put('/admin/atualizar', controller.update)

    app.post('/admin/atualizar', controller.consultaId)

    app.get('/membros/listar', controller.lista)
     }