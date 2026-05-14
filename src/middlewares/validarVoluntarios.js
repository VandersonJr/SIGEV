const Joi = require("joi");

const voluntarioSchema = Joi.object({
  pessoa_id: Joi.number().integer().required().messages({
    "number.base": "Pessoa deve ser um número",
    "number.integer": "Pessoa deve ser um número inteiro",
    "any.required": "Pessoa é obrigatória",
  }),

  habilidades: Joi.string().required().messages({
    "string.empty": "Habilidades são obrigatórias",
    "any.required": "Habilidades são obrigatórias",
  }),

  disponibilidade: Joi.string().required().messages({
    "string.empty": "Disponibilidade é obrigatória",
    "any.required": "Disponibilidade é obrigatória",
  }),

  status: Joi.string()
    .valid("ativo", "inativo")
    .default("ativo")
    .messages({
      "any.only": "Status inválido — use: ativo ou inativo",
    }),
});

function validarVoluntarios(req, res, next) {
  const { error } = voluntarioSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      erro: error.details.map((e) => e.message),
    });
  }

  next();
}

module.exports = validarVoluntarios;