const Joi = require("joi");

const usuarioSchema = Joi.object({
  nome: Joi.string().min(3).messages({
    "string.empty": "Nome não pode ser vazio",
    "string.min": "Nome deve ter pelo menos 3 caracteres",
  }),

  email: Joi.string().email().messages({
    "string.empty": "E-mail não pode ser vazio",
    "string.email": "E-mail deve ser um e-mail válido",
  }),

  senha: Joi.string().min(8).messages({
    "string.base": "Senha deve ser string",
    "string.empty": "Senha não pode ser vazia",
    "string.min": "Senha deve ter pelo menos 8 caracteres",
  }),
}).min(1).messages({
  "object.min": "Informe pelo menos um campo para atualizar: nome, email ou senha",
});

function validarAtualizacaoUsuarios(req, res, next) {
  const { error } = usuarioSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      erro: error.details.map((e) => e.message),
    });
  }

  next();
}

module.exports = validarAtualizacaoUsuarios;