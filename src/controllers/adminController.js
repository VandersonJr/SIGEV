const adminModel = require("../models/adminModel");

const {
  formatarDataHora,
  formatarData,
} = require("../utils/formatarData");

const exibirDashboard = async (req, res) => {
  try {
    const resultado = await adminModel.exibirDashboard();

    return res.status(200).json({
      dashboard: resultado.rows[0],
    });
  } catch (erro) {
    console.error("Erro ao exibir dashboard:", erro);

    return res.status(500).json({
      erro: "Erro interno ao exibir dashboard",
    });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const resultado = await adminModel.listarUsuarios();

    const usuarios = resultado.rows.map((usuario) => ({
      ...usuario,
      created_at: formatarDataHora(usuario.created_at),
      updated_at: formatarDataHora(usuario.updated_at),
    }));

    return res.status(200).json({ usuarios });
  } catch (erro) {
    console.error("Erro ao listar usuários:", erro);

    return res.status(500).json({
      erro: "Erro interno ao listar usuários",
    });
  }
};

const listarPessoas = async (req, res) => {
  try {
    const resultado = await adminModel.listarPessoas();

    const pessoas = resultado.rows.map((pessoa) => ({
      ...pessoa,
      data_nascimento: formatarData(pessoa.data_nascimento),
      created_at: formatarDataHora(pessoa.created_at),
      updated_at: formatarDataHora(pessoa.updated_at),
    }));

    return res.status(200).json({ pessoas });
  } catch (erro) {
    console.error("Erro ao listar pessoas:", erro);

    return res.status(500).json({
      erro: "Erro interno ao listar pessoas",
    });
  }
};

const listarAbrigos = async (req, res) => {
  try {
    const resultado = await adminModel.listarAbrigos();

    const abrigos = resultado.rows.map((abrigo) => ({
      ...abrigo,
      created_at: formatarDataHora(abrigo.created_at),
      updated_at: formatarDataHora(abrigo.updated_at),
    }));

    return res.status(200).json({ abrigos });
  } catch (erro) {
    console.error("Erro ao listar abrigos:", erro);

    return res.status(500).json({
      erro: "Erro interno ao listar abrigos",
    });
  }
};

const listarVoluntarios = async (req, res) => {
  try {
    const resultado = await adminModel.listarVoluntarios();

    const voluntarios = resultado.rows.map((voluntario) => ({
      ...voluntario,
      created_at: formatarDataHora(voluntario.created_at),
      updated_at: formatarDataHora(voluntario.updated_at),
    }));

    return res.status(200).json({ voluntarios });
  } catch (erro) {
    console.error("Erro ao listar voluntários:", erro);

    return res.status(500).json({
      erro: "Erro interno ao listar voluntários",
    });
  }
};

module.exports = {
  exibirDashboard,
  listarUsuarios,
  listarPessoas,
  listarAbrigos,
  listarVoluntarios,
};