const sync = require('synchronize')
const clienteModel = require('../model/cliente') 
const novoCliente = (req, cb) => sync.fiber(() => {

    const cliente = {
        idt_cliente: null,
        nome: req.params.nome,
        idade: req.params.idade
    }
    const valido = sync.await(clienteModel.validarCliente(cliente), sync.defer())
    cb(null, true)
    // const novoCliente = sync.await(inserirCliente(cliente), sync.defer())
}, err => err && cb(err,null))

const findAll = (cb) => {
    const consulta = clienteModel.findAll((err, result) => {
        if(err)
            cb(err, null)
        else
            cb(null, consulta)
    })
}

module.exports = {
    novoCliente,
    findAll
}