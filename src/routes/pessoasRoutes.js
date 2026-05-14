const express = require("express");
const router = express.Router();

const pessoasController = require("../controllers/pessoasController");

const validarPessoas = require("../middlewares/validacaoPessoas");
const validarAtualizacaoPessoas = require("../middlewares/validarAtualizacaoPessoas");

router.post(
  "/pessoas",
  validarPessoas,
  pessoasController.criarPessoa
);

router.get(
  "/pessoas",
  pessoasController.listarPessoas
);

router.get(
  "/pessoas/:id_pessoa",
  pessoasController.exibirPessoa
);

router.put(
  "/pessoas/:id_pessoa",
  validarAtualizacaoPessoas,
  pessoasController.atualizarPessoa
);

router.delete(
  "/pessoas/:id_pessoa",
  pessoasController.excluirPessoa
);

module.exports = router;