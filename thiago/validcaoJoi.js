const Joi = require('joi');

const usuario = {
    nome: Joi.string().required(),
    email: Joi.string().alphanum().require()
}

// Return result.
const result = Joi.validate({
    nome: 'abc',
    email: 'tanto@faz.com'
}, schema);
// result.error === null -> valid