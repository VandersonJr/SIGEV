const Joi = require("joi");

const abrigoSchema = Joi.object({
  nome_abrigo: Joi.string().messages({
    "string.empty": "Nome do abrigo não pode ser vazio",
  }),

  tipo_abrigo: Joi.string().messages({
    "string.empty": "Tipo do abrigo não pode ser vazio",
  }),

  cep: Joi.string().pattern(/^\d{8}$/).messages({
    "string.empty": "CEP não pode ser vazio",
    "string.pattern.base": "CEP inválido — informe apenas os 8 dígitos numéricos",
  }),

  logradouro: Joi.string().messages({
    "string.empty": "Logradouro não pode ser vazio",
  }),

  numero: Joi.string().allow(null, ""),

  complemento: Joi.string().allow(null, ""),

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

  latitude: Joi.number().allow(null, ""),

  longitude: Joi.number().allow(null, ""),

  capacidade_total: Joi.number().integer().min(1).messages({
    "number.base": "Capacidade total deve ser um número",
    "number.integer": "Capacidade total deve ser um número inteiro",
    "number.min": "Capacidade total deve ser maior que zero",
  }),

  ocupacao_atual: Joi.number().integer().min(0).messages({
    "number.base": "Ocupação atual deve ser um número",
    "number.integer": "Ocupação atual deve ser um número inteiro",
    "number.min": "Ocupação atual não pode ser negativa",
  }),

  status: Joi.string().valid("ativo", "lotado", "desativado").messages({
    "any.only": "Status inválido — use: ativo, lotado ou desativado",
  }),
}).min(1).messages({
  "object.min": "Informe pelo menos um campo para atualizar",
});

function validarAtualizacaoAbrigos(req, res, next) {
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

module.exports = validarAtualizacaoAbrigos;