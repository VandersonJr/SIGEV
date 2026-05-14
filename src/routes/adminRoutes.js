const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get(
  "/admin/dashboard",
  adminController.exibirDashboard
);

router.get(
  "/admin/usuarios",
  adminController.listarUsuarios
);

router.get(
  "/admin/pessoas",
  adminController.listarPessoas
);

router.get(
  "/admin/abrigos",
  adminController.listarAbrigos
);

router.get(
  "/admin/voluntarios",
  adminController.listarVoluntarios
);

module.exports = router;