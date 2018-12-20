const express = require('express');
const clienteCtrl = require('../controller/clienteController')
const router = express.Router();
const sync = require('synchronize')

// define the home page route
router.get('/', function (req, res) {
    res.send('Clientes App');
});
// define the about route
router.put('/insere/:nome/:idade', (req, res) => {
    clienteCtrl.novoCliente(req, (err, result) => {
        if(err)
            res.send('Error: ' + err)
        if(result)
            res.send(`Cliente ${req.params.nome} cadastrado com sucesso`)
    })
    
});

// router.get('/lista', (req, res) => sync.fiber(() => {
//     const result = sync.await(clienteCtrl.findAll(sync.defer()))
//     for(let cliente of result)
//         console.log(JSON.stringify(cliente))
//     }, e => e && res.send(e)
// ));

router.get('/lista', (req, res) => {
    const consulta = clienteCtrl.findAll((err, result) => {
    if (err)
        res.send(`Err: ${err}`)
    for (let cliente of consulta)
        console.log(JSON.stringify(cliente))
    })
});

module.exports = router;