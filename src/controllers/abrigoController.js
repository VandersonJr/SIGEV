const bcript = require("bcrypt");
const { formatarDataHora, formatarData } = require("../utils/formatarData");
const abrigoModel = require("../models/abrigoModel");



const criarAbrigo = async (req, res) => {
  try {
    const {
      nome_abrigo,
      tipo_abrigo,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      latitude,
      longitude,
      capacidade_total,
    } = req.body;

    const resultado = await abrigoModel.criarAbrigo(
      nome_abrigo,
      tipo_abrigo,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      latitude,
      longitude,
      capacidade_total
    );

    return res.status(201).json({
      mensagem: "Abrigo cadastrado com sucesso",
      abrigo: {
        ...resultado.rows[0],
        created_at: formatarDataHora(resultado.rows[0].created_at),
        updated_at: formatarDataHora(resultado.rows[0].updated_at),
      },
    });

  } catch (erro) {

    console.error("Erro ao cadastrar abrigo:", erro);

    return res.status(500).json({
      erro: "Erro interno ao cadastrar abrigo",
    });
  }
};

const exibirAbrigo = async (req, res) => {
  try {
    const { id_abrigo } = req.params;

    const resultado = await abrigoModel.exibirAbrigo(id_abrigo);

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Abrigo não encontrado",
      });
    }

    return res.status(200).json({
      abrigo: {
        ...resultado.rows[0],
        created_at: formatarDataHora(resultado.rows[0].created_at),
        updated_at: formatarDataHora(resultado.rows[0].updated_at),
      },
    });

  } catch (erro) {

    console.error("Erro ao exibir abrigo:", erro);

    return res.status(500).json({
      erro: "Erro interno ao exibir abrigo",
    });
  }
};

const listarAbrigos = async (req, res) => {
  try {
    const resultado = await abrigoModel.listarAbrigos();

    const abrigosFormatados = resultado.rows.map((abrigo) => ({
      ...abrigo,
      created_at: formatarDataHora(abrigo.created_at),
      updated_at: formatarDataHora(abrigo.updated_at),
    }));

    return res.status(200).json({
      abrigos: abrigosFormatados,
    });

  } catch (erro) {

    console.error("Erro ao listar abrigos:", erro);

    return res.status(500).json({
      erro: "Erro interno ao listar abrigos",
    });
  }
};

const atualizarAbrigo = async (req, res) => {
  try {
    const { id_abrigo } = req.params;

    const {
      nome_abrigo,
      tipo_abrigo,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      latitude,
      longitude,
      capacidade_total,
      ocupacao_atual,
      status,
    } = req.body;

    const resultado = await abrigoModel.atualizarAbrigo(
      id_abrigo,
      nome_abrigo,
      tipo_abrigo,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      latitude,
      longitude,
      capacidade_total,
      ocupacao_atual,
      status
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Abrigo não encontrado",
      });
    }

    return res.status(200).json({
      mensagem: "Abrigo atualizado com sucesso",
      abrigo: {
        ...resultado.rows[0],
        created_at: formatarDataHora(resultado.rows[0].created_at),
        updated_at: formatarDataHora(resultado.rows[0].updated_at),
      },
    });

  } catch (erro) {

    console.error("Erro ao atualizar abrigo:", erro);

    return res.status(500).json({
      erro: "Erro interno ao atualizar abrigo",
    });
  }
};

const excluirAbrigo = async (req, res) => {
  try {
    const { id_abrigo } = req.params;

    const resultado = await abrigoModel.excluirAbrigo(id_abrigo);

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Abrigo não encontrado",
      });
    }

    return res.status(200).json({
      mensagem: "Abrigo desativado com sucesso",
      abrigo: {
        ...resultado.rows[0],
        created_at: formatarDataHora(resultado.rows[0].created_at),
        updated_at: formatarDataHora(resultado.rows[0].updated_at),
      },
    });

  } catch (erro) {

    console.error("Erro ao desativar abrigo:", erro);

    return res.status(500).json({
      erro: "Erro interno ao desativar abrigo",
    });
  }
};

module.exports = {
  criarAbrigo,
  exibirAbrigo,
  listarAbrigos,
  atualizarAbrigo,
  excluirAbrigo,
};