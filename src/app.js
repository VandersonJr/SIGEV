require ("dotenv").config();
const express = require("express");
const pool = require("./config/db");
const cors = require("cors");
const bcrypt = require("bcrypt");

const authRoutes = require("./routes/authRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const pessoasRoutes = require("./routes/pessoasRoutes");
const abrigoRoutes = require("./routes/abrigoRoutes");
const voluntariosRoutes = require("./routes/voluntariosRoutes");
const adminRoutes = require("./routes/adminRoutes");


const app = express();
app.use(express.json());
app.use(cors());



//Rota inicial
app.get("/", (req, res) => { 
    res.send("<h1>Página de Início - SIGEV</h1>")
});

//Rota de Login
app.use(authRoutes);

//Rota de usuarios
app.use(usuarioRoutes);

//Rota de pessoas
app.use(pessoasRoutes);

//Rota de abrigo
app.use(abrigoRoutes);

//Rota de voluntários
app.use(voluntariosRoutes);

//Rota da Administração dos abrigos
app.use(adminRoutes);


module.exports = app;