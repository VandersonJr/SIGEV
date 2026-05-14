const Joi = require("joi");

const adminSchema = Joi.object({
  nome: Joi.string().min(3).required().messages({
    "string.empty": "Nome é obrigatório",
    "string.min": "Nome deve ter pelo menos 3 caracteres",
    "any.required": "Nome é obrigatório",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "E-mail é obrigatório",
    "string.email": "E-mail deve ser válido",
    "any.required": "E-mail é obrigatório",
  }),

  senha: Joi.string().min(8).required().messages({
    "string.empty": "Senha é obrigatória",
    "string.min": "Senha deve ter pelo menos 8 caracteres",
    "any.required": "Senha é obrigatória",
  }),

  nivel_acesso: Joi.string().valid("admin", "super_admin").required().messages({
    "any.only": "Nível de acesso inválido",
    "any.required": "Nível de acesso é obrigatório",
  }),
});

function validacaoAdmin(req, res, next) {
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

module.exports = validacaoAdmin;