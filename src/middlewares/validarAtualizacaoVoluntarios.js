const Joi = require("joi");

const voluntarioSchema = Joi.object({
  habilidades: Joi.string().messages({
    "string.empty": "Habilidades não podem ser vazias",
  }),

  disponibilidade: Joi.string().messages({
    "string.empty": "Disponibilidade não pode ser vazia",
  }),

  status: Joi.string()
    .valid("ativo", "inativo")
    .messages({
      "any.only": "Status inválido — use: ativo ou inativo",
    }),
}).min(1).messages({
  "object.min": "Informe pelo menos um campo para atualizar",
});

function validarAtualizacaoVoluntarios(req, res, next) {
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

module.exports = validarAtualizacaoVoluntarios;