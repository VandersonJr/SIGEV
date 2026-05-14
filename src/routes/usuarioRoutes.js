const express = require("express");
const router = express.Router();
const validarUsuarios = require("../middlewares/validacaoUsuario");
const controller = require("../controllers/usuarioController");

router.post("/usuarios", validarUsuarios, controller.criarUsuario);

router.get("/usuarios", controller.exibirUsuario);

router.put("/usuarios/:id_usuario", controller.atualizarUsuario);

router.delete("/usuarios/:id_usuario", controller.excluirUsuario);

module.exports = router;