const express = require('express')
const load = require('express-load');
const app = express()
const httpPort = 3000

app.listen(httpPort)

const { tituloHtml } = require('./util/html_util.js')

const cliente = require('./model/cliente')
app.use('/cliente', cliente);

// load('./routes/router.js');
//    .into(app);

console.log(`###### Servidor Iniciado. Porta: ${httpPort} ########`)