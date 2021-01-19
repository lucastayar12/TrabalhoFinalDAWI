const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./src/configs/sequelize');
const handlebars = require('express-handlebars');
const path = require("path")

const publicPath = path.join(__dirname, '../public');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.static('node_modules'));


db.sequelize.sync({ alter: true }).then(() => {
    console.log("Base de dados criada com sucesso")
})

app.get("/", (req, res) => {
    res.render('index');
})

var server = app.listen(3000, () => {
    console.log('Servidor está rodando na porta ' + server.address().port + ' no host ' + server.address().address);
})
