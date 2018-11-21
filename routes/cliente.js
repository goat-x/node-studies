var express = require('express');
var router = express.Router();

// define the home page route
router.get('/', function (req, res) {
    res.send('Clientes App');
});
// define the about route
router.get('/novo', function (req, res) {
    res.send('Novo Cliente');
});

router.get('/lista', function (req, res) {
    res.send('Lista de Clientes');
});

module.exports = router;