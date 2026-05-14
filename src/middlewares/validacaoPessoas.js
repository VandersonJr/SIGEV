const Joi = require("joi");

const pessoaSchema = Joi.object({
  user_id: Joi.number().integer().required().messages({
    "number.base": "Usuário deve ser um número",
    "number.integer": "Usuário deve ser um número inteiro",
    "any.required": "Usuário é obrigatório",
  }),

  cpf: Joi.string().pattern(/^\d{11}$/).required().messages({
    "string.empty": "CPF é obrigatório",
    "string.pattern.base": "CPF inválido — informe apenas os 11 dígitos numéricos",
    "any.required": "CPF é obrigatório",
  }),

  data_nascimento: Joi.date().required().messages({
    "date.base": "Data de nascimento inválida",
    "any.required": "Data de nascimento é obrigatória",
  }),

  genero: Joi.string().allow(null, ""),

  telefone: Joi.string().required().messages({
    "string.empty": "Telefone é obrigatório",
    "any.required": "Telefone é obrigatório",
  }),

  cep: Joi.string().pattern(/^\d{8}$/).required().messages({
    "string.empty": "CEP é obrigatório",
    "string.pattern.base": "CEP inválido — informe apenas os 8 dígitos numéricos",
    "any.required": "CEP é obrigatório",
  }),

  bairro: Joi.string().required().messages({
    "string.empty": "Bairro é obrigatório",
    "any.required": "Bairro é obrigatório",
  }),

  cidade: Joi.string().required().messages({
    "string.empty": "Cidade é obrigatória",
    "any.required": "Cidade é obrigatória",
  }),

  estado: Joi.string().pattern(/^[A-Z]{2}$/).required().messages({
    "string.empty": "Estado é obrigatório",
    "string.pattern.base": "Estado inválido — informe a sigla com 2 letras maiúsculas, ex: SP",
    "any.required": "Estado é obrigatório",
  }),
});

function validarPessoas(req, res, next) {
  const { error } = pessoaSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      erro: error.details.map((e) => e.message),
    });
  }

  next();
}

module.exports = validarPessoas;