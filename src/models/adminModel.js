const pool = require("../config/db");

const exibirDashboard = async () => {
  return await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM usuarios) AS total_usuarios,
      (SELECT COUNT(*) FROM pessoas) AS total_pessoas,
      (SELECT COUNT(*) FROM abrigo) AS total_abrigos,
      (SELECT COUNT(*) FROM voluntarios) AS total_voluntarios
  `);
};

const listarUsuarios = async () => {
  return await pool.query(`
    SELECT id_usuario, nome, email, ativo, created_at, updated_at
    FROM usuarios
    ORDER BY id_usuario ASC
  `);
};

const listarPessoas = async () => {
  return await pool.query(`
    SELECT 
      p.id_pessoa, p.user_id, u.nome, p.cpf, p.data_nascimento,
      p.genero, p.telefone, p.cep, p.bairro, p.cidade, p.estado,
      p.created_at, p.updated_at
    FROM pessoas p
    INNER JOIN usuarios u ON u.id_usuario = p.user_id
    ORDER BY p.id_pessoa ASC
  `);
};

const listarAbrigos = async () => {
  return await pool.query(`
    SELECT *
    FROM abrigo
    ORDER BY id_abrigo ASC
  `);
};

const listarVoluntarios = async () => {
  return await pool.query(`
    SELECT
      v.id_voluntario,
      v.pessoa_id,
      v.abrigo_id,
      u.nome,
      p.cpf,
      v.especialidade,
      v.ativo
    FROM voluntarios v
    INNER JOIN pessoas p 
      ON p.id_pessoa = v.pessoa_id
    INNER JOIN usuarios u 
      ON u.id_usuario = p.user_id
    ORDER BY v.id_voluntario ASC
  `);
};

module.exports = {
  exibirDashboard,
  listarUsuarios,
  listarPessoas,
  listarAbrigos,
  listarVoluntarios,
};