const express = require('express');
const Joi = require('joi')
const router = express.Router();
const MySqlDatabase = require('../infra/connectionFactory')
const sync = require('synchronize')


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

router.put('/insere/:nome/:idade', (req, res) => sync.fiber(() => {
    // console.log(req.params.nome)
    // console.log(req.params.idade)

    const cliente = {
        idt_cliente: null,
        nome: req.params.nome,
        idade: req.params.idade
    }

    const result = sync.await(validarCliente(cliente), sync.defer())
    persistirCliente(result).then(
        () => res.send(JSON.stringify({
            status: 200,
            response: `Cliente ${cliente.nome} inserido com sucesso.`
        })),
        error => res.send(JSON.stringify({
            status: 500,
            response: `Erro Banco: ${error}`
        })))
    // TODO tratar o erro do fiber
}, error => error && res.send(JSON.stringify({
        status: 500,
        response: `Erro validacao: ${error}`
    }))
))

const validarCliente = (cliente, cb) => {
    const schema = Joi.object().keys({
        idt_cliente: Joi.any(),
        nome: Joi.string().alphanum().max(255).required(),
        idade: Joi.number().required()
    }).with('nome', 'idade')

    Joi.validate(cliente, schema, cb)
}

const persistirCliente = (cliente) => new Promise((resolve, reject) => {
    const insertDDL = `insert into t_cliente values (null,'${cliente.nome}',${cliente.idade})`
    console.log('Persistindo Cliente...')
    let p = new MySqlDatabase(MySqlDatabase.configMySQL)
    p.insert(insertDDL).then(resolve, reject)
})

module.exports = router