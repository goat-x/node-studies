const express = require('express');
const Joi = require('joi')
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
    // console.log(req.params.nome)
    // console.log(req.params.idade)

    const cliente = {
        idt_cliente: null,
        nome: req.params.nome,
        idade: req.params.idade
    }

    validarCliente(cliente).then(
        result => persistirCliente(result)
        .then(
            result => res.send(JSON.stringify({
                status: 200,
                response: `Cliente ${cliente.nome} inserido com sucesso.`
            })),
            error => res.send(JSON.stringify({
                status: 500,
                response: `Erro Banco: ${error}`
            }))
        ,
        error => res.send(JSON.stringify({
            status: 500,
            response: `Erro validacao: ${error}`
        }))
    ))
})

function validarCliente(cliente) {
    return new Promise((resolve, reject) => {
        const schema = Joi.object().keys({
            idt_cliente: Joi.any(),
            nome: Joi.string().alphanum().max(255).required(),
            idade: Joi.number().required()
        }).with('nome', 'idade')

        Joi.validate(cliente, schema, (error, value) => {
            if (error != null) 
                reject(error)
            else
                resolve(cliente)
            })
        })
}

const persistirCliente = (cliente) => new Promise((resolve, reject) =>{
        const insertDDL = `insert into t_cliente values (null,'${cliente.nome}',${cliente.idade})`
        console.log('Persistindo Cliente...')
        let p = new MySqlDatabase(MySqlDatabase.configMySQL)
        p.insert(insertDDL).then(resolve, reject)
    })

module.exports = router