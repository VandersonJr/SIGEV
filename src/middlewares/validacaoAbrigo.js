const Joi = require("joi");

const abrigoSchema = Joi.object({
  nome_abrigo: Joi.string().required().messages({
    "string.empty": "Nome do abrigo é obrigatório",
    "any.required": "Nome do abrigo é obrigatório",
  }),

  tipo_abrigo: Joi.string().required().messages({
    "string.empty": "Tipo do abrigo é obrigatório",
    "any.required": "Tipo do abrigo é obrigatório",
  }),

  cep: Joi.string().pattern(/^\d{8}$/).required().messages({
    "string.empty": "CEP é obrigatório",
    "string.pattern.base": "CEP inválido — informe apenas os 8 dígitos numéricos",
    "any.required": "CEP é obrigatório",
  }),

  logradouro: Joi.string().required().messages({
    "string.empty": "Logradouro é obrigatório",
    "any.required": "Logradouro é obrigatório",
  }),

  numero: Joi.string().allow(null, ""),

  complemento: Joi.string().allow(null, ""),

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

  latitude: Joi.number().allow(null, ""),

  longitude: Joi.number().allow(null, ""),

  capacidade_total: Joi.number().integer().min(1).required().messages({
    "number.base": "Capacidade total deve ser um número",
    "number.integer": "Capacidade total deve ser um número inteiro",
    "number.min": "Capacidade total deve ser maior que zero",
    "any.required": "Capacidade total é obrigatória",
  }),
});

function validarAbrigos(req, res, next) {
  const { error } = abrigoSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      erro: error.details.map((e) => e.message),
    });
  }

  next();
}

module.exports = validarAbrigos;