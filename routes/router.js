function rotas(){

    const birds = require('./routes/birds')
    const clientes = require('./routes/cliente')

    app.use('/birds', birds);
    app.use('/cliente', clientes);

    //Routers of root...
    app.get('/about', function (req, res) {
        res.send(tituloHtml('about'));
    });

    app.get('/', function (req, res) {
        res.send(tituloHtml('home'));
    });

    app.get('*', function (req, res) {
        res.send(tituloHtml('url invalida'));
    });
}

module.exports = rotas;