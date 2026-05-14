const Joi = require("joi");

const adminSchema = Joi.object({
  nome: Joi.string().min(3).messages({
    "string.empty": "Nome não pode ser vazio",
    "string.min": "Nome deve ter pelo menos 3 caracteres",
  }),

  email: Joi.string().email().messages({
    "string.empty": "E-mail não pode ser vazio",
    "string.email": "E-mail deve ser válido",
  }),

  senha: Joi.string().min(8).messages({
    "string.empty": "Senha não pode ser vazia",
    "string.min": "Senha deve ter pelo menos 8 caracteres",
  }),

  nivel_acesso: Joi.string().valid("admin", "super_admin").messages({
    "any.only": "Nível de acesso inválido",
  }),

  ativo: Joi.boolean().messages({
    "boolean.base": "Ativo deve ser verdadeiro ou falso",
  }),
}).min(1).messages({
  "object.min": "Informe pelo menos um campo para atualizar",
});

function validacaoAtualizacaoAdmin(req, res, next) {
  const { error } = adminSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      erro: error.details.map((e) => e.message),
    });
  }

  next();
}

module.exports = validacaoAtualizacaoAdmin;