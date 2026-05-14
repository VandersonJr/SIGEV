const express = require("express");
const router = express.Router();

const abrigoController = require("../controllers/abrigoController");

const validarAbrigos = require("../middlewares/validacaoAbrigo");
const validarAtualizacaoAbrigos = require("../middlewares/validarAtualizacaoAbrigos");

router.post(
  "/abrigos",
  validarAbrigos,
  abrigoController.criarAbrigo
);

router.get(
  "/abrigos",
  abrigoController.listarAbrigos
);

router.get(
  "/abrigos/:id_abrigo",
  abrigoController.exibirAbrigo
);

router.put(
  "/abrigos/:id_abrigo",
  validarAtualizacaoAbrigos,
  abrigoController.atualizarAbrigo
);

router.delete(
  "/abrigos/:id_abrigo",
  abrigoController.excluirAbrigo
);

module.exports = router;