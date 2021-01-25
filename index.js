const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./src/configs/sequelize');
const handlebars = require('express-handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({limit: '1024mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '1024mb', extended: true}))

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.static('node_modules'));

require('./src/admin/routes')(app)
require('./src/membros/routes')(app)

db.sequelize.sync({ alter: true }).then(() => {
    console.log("Base de dados criada com sucesso")
})

app.get("/", (req, res) => {
    res.render('index');
})

app.get("/login", (req, res) => {
    res.render('loginadm');
})

app.get("/admin", (req, res) => {
    res.render('admprincipal');
})

app.get("/membros", (req, res) => {
    res.render('membros');
})

var server = app.listen(3000, () => {
    console.log('Servidor está rodando na porta ' + server.address().port + ' no host ' + server.address().address);
})
