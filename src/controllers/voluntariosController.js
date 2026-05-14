const bcrypt = require("bcrypt");
const { formatarDataHora, formatarData } = require("../utils/formatarData");
const voluntarioModel = require("../models/voluntariosModel");

const criarVoluntario = async (req, res) => {
  try {
    const { pessoa_id, abrigo_id, especialidade, ativo } = req.body;

    const resultado = await voluntarioModel.criarVoluntario(
      pessoa_id,
      abrigo_id,
      especialidade,
      ativo
    );

    return res.status(201).json({
      mensagem: "Voluntário cadastrado com sucesso",
      voluntario: resultado.rows[0],
    });
  } catch (erro) {
    if (erro.code === "23503") {
      return res.status(404).json({
        erro: "Pessoa ou abrigo não encontrado",
      });
    }

    if (erro.code === "23505") {
      return res.status(409).json({
        erro: "Voluntário já cadastrado",
      });
    }

    console.error("Erro ao cadastrar voluntário:", erro);

    return res.status(500).json({
      erro: "Erro interno ao cadastrar voluntário",
    });
  }
};

const exibirVoluntario = async (req, res) => {
  try {
    const { id_voluntario } = req.params;

    const resultado = await voluntarioModel.exibirVoluntario(id_voluntario);

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Voluntário não encontrado",
      });
    }

    return res.status(200).json({
      voluntario: resultado.rows[0],
    });
  } catch (erro) {
    console.error("Erro ao exibir voluntário:", erro);

    return res.status(500).json({
      erro: "Erro interno ao exibir voluntário",
    });
  }
};

const listarVoluntarios = async (req, res) => {
  try {
    const resultado = await voluntarioModel.listarVoluntarios();

    return res.status(200).json({
      voluntarios: resultado.rows,
    });
  } catch (erro) {
    console.error("Erro ao listar voluntários:", erro);

    return res.status(500).json({
      erro: "Erro interno ao listar voluntários",
    });
  }
};

const atualizarVoluntario = async (req, res) => {
  try {
    const { id_voluntario } = req.params;
    const { abrigo_id, especialidade, ativo } = req.body;

    const resultado = await voluntarioModel.atualizarVoluntario(
      id_voluntario,
      abrigo_id,
      especialidade,
      ativo
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Voluntário não encontrado",
      });
    }

    return res.status(200).json({
      mensagem: "Voluntário atualizado com sucesso",
      voluntario: resultado.rows[0],
    });
  } catch (erro) {
    console.error("Erro ao atualizar voluntário:", erro);

    return res.status(500).json({
      erro: "Erro interno ao atualizar voluntário",
    });
  }
};

const excluirVoluntario = async (req, res) => {
  try {
    const { id_voluntario } = req.params;

    const resultado = await voluntarioModel.excluirVoluntario(id_voluntario);

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Voluntário não encontrado",
      });
    }

    return res.status(200).json({
      mensagem: "Voluntário desativado com sucesso",
      voluntario: resultado.rows[0],
    });
  } catch (erro) {
    console.error("Erro ao desativar voluntário:", erro);

    return res.status(500).json({
      erro: "Erro interno ao desativar voluntário",
    });
  }
};

module.exports = {
  criarVoluntario,
  exibirVoluntario,
  listarVoluntarios,
  atualizarVoluntario,
  excluirVoluntario,
};