const express = require('express');
const router = express.Router();
const MySqlDatabase = require('../infra/connectionFactory')



router.get('/lista', function (req, res) {

    const p = new MySqlDatabase(MySqlDatabase.configMySQL)
    p.query('select * from t_cliente').then(
        result => res.send(JSON.stringify({
            status: 200,
            response: result
        })),
        error => res.send(JSON.stringify({
            status: 500,
            response: 'Erro encontrado: ' + error
        }))
    )
    // .then(
    //     p.close().then((resolve, reject) => {
    //         if (reject)
    //             return reject(reject)
    //         console.log('Closed Connection')
    //     })
    // )
});

router.put('/insere/:nome/:idade', function(req, res) {
    console.log(req.params.nome)
    console.log(req.params.idade)

    const insertDDL = `insert into t_cliente values (null,'${req.params.nome}',${req.params.idade})`

    let p = new MySqlDatabase(MySqlDatabase.configMySQL)
    p.insert(insertDDL).then(
        result => {
            res.send(JSON.stringify({
                status: 200,
                response: `Cliente ${req.params.nome} inserido com sucesso.`
            }))
        },
        error => {
            res.send(JSON.stringify({
                status: 500,
                response: `Erro ocorrido: ` + error
            }))
        }
    )
})

module.exports = router