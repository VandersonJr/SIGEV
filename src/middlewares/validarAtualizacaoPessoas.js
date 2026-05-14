const Joi = require("joi");

const pessoaSchema = Joi.object({
  cpf: Joi.string().pattern(/^\d{11}$/).messages({
    "string.empty": "CPF não pode ser vazio",
    "string.pattern.base": "CPF inválido — informe apenas os 11 dígitos numéricos",
  }),

  data_nascimento: Joi.date().messages({
    "date.base": "Data de nascimento inválida",
  }),

  genero: Joi.string().allow(null, ""),

  telefone: Joi.string().messages({
    "string.empty": "Telefone não pode ser vazio",
  }),

  cep: Joi.string().pattern(/^\d{8}$/).messages({
    "string.empty": "CEP não pode ser vazio",
    "string.pattern.base": "CEP inválido — informe apenas os 8 dígitos numéricos",
  }),

  bairro: Joi.string().messages({
    "string.empty": "Bairro não pode ser vazio",
  }),

  cidade: Joi.string().messages({
    "string.empty": "Cidade não pode ser vazia",
  }),

  estado: Joi.string().pattern(/^[A-Z]{2}$/).messages({
    "string.empty": "Estado não pode ser vazio",
    "string.pattern.base": "Estado inválido — informe a sigla com 2 letras maiúsculas, ex: SP",
  }),
}).min(1).messages({
  "object.min": "Informe pelo menos um campo para atualizar",
});

function validarAtualizacaoPessoas(req, res, next) {
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

module.exports = validarAtualizacaoPessoas;