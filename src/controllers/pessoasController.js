const bcrypt = require("bcrypt");
const { formatarDataHora, formatarData } = require("../utils/formatarData");
const pessoasModel = require("../models/pessoasModel");



const criarPessoa = async (req, res) => {
  try {
    const {
      user_id,
      cpf,
      data_nascimento,
      genero,
      telefone,
      cep,
      bairro,
      cidade,
      estado,
    } = req.body;

    const resultado = await pessoasModel.criarPessoa(
      user_id,
      cpf,
      data_nascimento,
      genero,
      telefone,
      cep,
      bairro,
      cidade,
      estado
    );

    return res.status(201).json({
      mensagem: "Pessoa cadastrada com sucesso",
      pessoa: {
        ...resultado.rows[0],
        data_nascimento: formatarData(resultado.rows[0].data_nascimento),
        created_at: formatarDataHora(resultado.rows[0].created_at),
        updated_at: formatarDataHora(resultado.rows[0].updated_at),
      },
    });
  } catch (erro) {
    if (erro.code === "23505") {
      return res.status(409).json({
        erro: "CPF já cadastrado",
      });
    }

    if (erro.code === "23503") {
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
    }

    console.error("Erro ao cadastrar pessoa:", erro);

    return res.status(500).json({
      erro: "Erro interno ao cadastrar pessoa",
    });
  }
};

const exibirPessoa = async (req, res) => {
  try {
    const { id_pessoa } = req.params;

    const resultado = await pessoasModel.exibirPessoa(id_pessoa);

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Pessoa não encontrada",
      });
    }

    return res.status(200).json({
      pessoa: {
        ...resultado.rows[0],
        data_nascimento: formatarData(resultado.rows[0].data_nascimento),
        created_at: formatarDataHora(resultado.rows[0].created_at),
        updated_at: formatarDataHora(resultado.rows[0].updated_at),
      },
    });
  } catch (erro) {
    console.error("Erro ao exibir pessoa:", erro);

    return res.status(500).json({
      erro: "Erro interno ao exibir pessoa",
    });
  }
};

const listarPessoas = async (req, res) => {
  try {
    const resultado = await pessoasModel.listarPessoas();

    const pessoasFormatadas = resultado.rows.map((pessoa) => ({
      ...pessoa,
      data_nascimento: formatarData(pessoa.data_nascimento),
      created_at: formatarDataHora(pessoa.created_at),
      updated_at: formatarDataHora(pessoa.updated_at),
    }));

    return res.status(200).json({
      pessoas: pessoasFormatadas,
    });
  } catch (erro) {
    console.error("Erro ao listar pessoas:", erro);

    return res.status(500).json({
      erro: "Erro interno ao listar pessoas",
    });
  }
};

const atualizarPessoa = async (req, res) => {
  try {
    const { id_pessoa } = req.params;

    const {
      cpf,
      data_nascimento,
      genero,
      telefone,
      cep,
      bairro,
      cidade,
      estado,
    } = req.body;

    const resultado = await pessoasModel.atualizarPessoa(
      id_pessoa,
      cpf,
      data_nascimento,
      genero,
      telefone,
      cep,
      bairro,
      cidade,
      estado
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Pessoa não encontrada",
      });
    }

    return res.status(200).json({
      mensagem: "Pessoa atualizada com sucesso",
      pessoa: {
        ...resultado.rows[0],
        data_nascimento: formatarData(resultado.rows[0].data_nascimento),
        created_at: formatarDataHora(resultado.rows[0].created_at),
        updated_at: formatarDataHora(resultado.rows[0].updated_at),
      },
    });
  } catch (erro) {
    if (erro.code === "23505") {
      return res.status(409).json({
        erro: "CPF já cadastrado",
      });
    }

    console.error("Erro ao atualizar pessoa:", erro);

    return res.status(500).json({
      erro: "Erro interno ao atualizar pessoa",
    });
  }
};

const excluirPessoa = async (req, res) => {
  try {
    const { id_pessoa } = req.params;

    const resultado = await pessoasModel.excluirPessoa(id_pessoa);

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Pessoa não encontrada",
      });
    }

    return res.status(200).json({
      mensagem: "Pessoa removida com sucesso",
      pessoa: {
        ...resultado.rows[0],
        data_nascimento: formatarData(resultado.rows[0].data_nascimento),
        created_at: formatarDataHora(resultado.rows[0].created_at),
        updated_at: formatarDataHora(resultado.rows[0].updated_at),
      },
    });
  } catch (erro) {
    console.error("Erro ao remover pessoa:", erro);

    return res.status(500).json({
      erro: "Erro interno ao remover pessoa",
    });
  }
};

module.exports = {
  criarPessoa,
  exibirPessoa,
  listarPessoas,
  atualizarPessoa,
  excluirPessoa,
};