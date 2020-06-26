const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/indexRouter');
const connection =  require('./database/connection');

const app = express();

// Conexão Banco de Dados
connection
    .authenticate()
    .then(() => {
        //console.log('Conexão com o banco realizada com sucesso!');
    })
    .catch((error) => {
        console.log('Ocorreu um erro ao se conectar: ' + error);
    });

// BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configuração view engine
app.set('view engine', 'ejs');

// express static
app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/', routes);

const port = 3333;
app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`);
});