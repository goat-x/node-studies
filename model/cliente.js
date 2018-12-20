const express = require('express');
const sync = require('synchronize')
const Joi = require('joi')
// const MySqlDatabase = require('../infra/connectionFactory')
const Sequelize = require('sequelize');
const configMySQL = {
    database: 'study_schema',
    username: 'nodejs_user',
    password: 'nodejs_user',
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
}
const sequelize = new Sequelize(configMySQL)

const Cliente = sequelize.define(
    'Cliente', {
        idt_cliente: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nome: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        idade: {
            type: Sequelize.INTEGER(2),
            allowNull: false
        }
    },{
        tableName: 't_cliente'
    }
)

const validarCliente = (cliente, cb) => {
    const schema = Joi.object().keys({
        idt_cliente: Joi.any(),
        nome: Joi.string().alphanum().max(255).required(),
        idade: Joi.number().required()
    }).with('nome', 'idade')
    Joi.validate(cliente, schema).then
}

const findAll = function(cb) {
    Cliente.findAll({
        attributes:['idt_cliente','nome','idade'],
    }).then(cb).catch(cb)
}

const inserirCliente = function(novoCliente) {
    console.log('Gravando...')
     Cliente.create({
         nome: novoCliente.nome,
         idade: novoCliente.idade
     }).then(novoCliente).catch(novoCliente)
}

module.exports = {
    validarCliente,
    findAll
}