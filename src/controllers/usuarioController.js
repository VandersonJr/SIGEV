const bcript = require("bcrypt");
const usuarioModel = require("../models/usuarioModel");
const { formatarDataHora, formatarData } = require("../utils/formatarData");

const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    const resultado = await usuarioModel.criarUsuario(
      nome,
      email,
      senhaHash
    );

    return res.status(201).json({
      mensagem: "Usuário criado com sucesso",
      usuario: {
        ...resultado.rows[0],
        created_at: formatarDataHora(resultado.rows[0].created_at),
        updated_at: formatarDataHora(resultado.rows[0].updated_at),
      },
    });
  } catch (erro) {
    if (erro.code === "23505") {
      return res.status(409).json({
        erro: "E-mail já cadastrado",
      });
    }

    console.error("Erro ao criar usuário:", erro);
    return res.status(500).json({
      erro: "Erro interno ao criar usuário",
    });
  }
};

const exibirUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const resultado = await usuarioModel.exibirUsuario(id_usuario);

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
    }

    return res.status(200).json({
      usuario: {
        ...resultado.rows[0],
        created_at: formatarDataHora(resultado.rows[0].created_at),
        updated_at: formatarDataHora(resultado.rows[0].updated_at),
      },
    });
  } catch (erro) {
    console.error("Erro ao exibir usuário:", erro);

    return res.status(500).json({
      erro: "Erro interno ao exibir usuário",
    });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const resultado = await usuarioModel.listarUsuarios();

    const usuariosFormatados = resultado.rows.map((usuario) => ({
      ...usuario,
      created_at: formatarDataHora(usuario.created_at),
      updated_at: formatarDataHora(usuario.updated_at),
    }));

    return res.status(200).json({
      usuarios: usuariosFormatados,
    });
  } catch (erro) {
    console.error("Erro ao listar usuários:", erro);

    return res.status(500).json({
      erro: "Erro interno ao listar usuários",
    });
  }
};

const atualizarUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const { nome, email, senha } = req.body;

    let senhaHash;

    if (senha) {
      senhaHash = await bcrypt.hash(senha, 10);
    }

    const resultado = await usuarioModel.atualizarUsuario(
      id_usuario,
      nome,
      email,
      senhaHash
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
    }

    return res.status(200).json({
      mensagem: "Usuário atualizado com sucesso",
      usuario: {
        ...resultado.rows[0],
        created_at: formatarDataHora(resultado.rows[0].created_at),
        updated_at: formatarDataHora(resultado.rows[0].updated_at),
      },
    });
  } catch (erro) {
    if (erro.code === "23505") {
      return res.status(409).json({
        erro: "E-mail já cadastrado",
      });
    }

    console.error("Erro ao atualizar usuário:", erro);

    return res.status(500).json({
      erro: "Erro interno ao atualizar usuário",
    });
  }
};

const excluirUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const resultado = await usuarioModel.excluirUsuario(id_usuario);

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
    }

    return res.status(200).json({
      mensagem: "Usuário excluído com sucesso",
      usuario: {
        ...resultado.rows[0],
        created_at: formatarDataHora(resultado.rows[0].created_at),
        updated_at: formatarDataHora(resultado.rows[0].updated_at),
      },
    });
  } catch (erro) {
    console.error("Erro ao excluir usuário:", erro);

    return res.status(500).json({
      erro: "Erro interno ao excluir usuário",
    });
  }
};

module.exports = { criarUsuario, exibirUsuario, listarUsuarios, atualizarUsuario, excluirUsuario };