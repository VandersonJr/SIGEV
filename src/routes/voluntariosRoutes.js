const express = require("express");
const router = express.Router();

const voluntarioController = require("../controllers/voluntariosController");

const validarVoluntarios = require("../middlewares/validarVoluntarios");
const validarAtualizacaoVoluntarios = require("../middlewares/validarAtualizacaoVoluntarios");

router.post(
  "/voluntarios",
  validarVoluntarios,
  voluntarioController.criarVoluntario
);

router.get(
  "/voluntarios",
  voluntarioController.listarVoluntarios
);

router.get(
  "/voluntarios/:id_voluntario",
  voluntarioController.exibirVoluntario
);

router.put(
  "/voluntarios/:id_voluntario",
  validarAtualizacaoVoluntarios,
  voluntarioController.atualizarVoluntario
);

router.delete(
  "/voluntarios/:id_voluntario",
  voluntarioController.excluirVoluntario
);

module.exports = router;