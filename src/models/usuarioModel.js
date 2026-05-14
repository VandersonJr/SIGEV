const pool = require ("../config/db");

const criarUsuario = async (nome, email, senhaHash) => {
    return await pool.query(
          `
          INSERT INTO usuarios (nome, email, senha_hash)
          VALUES ($1, $2, $3)
          RETURNING id_usuario, nome, email, ativo, created_at
        `,
          [nome, email, senhaHash],
        );
}

const buscarUsuario = async (email) => { 
    return await pool.query(`
                    SELECT * FROM usuarios WHERE email=$1    
                `,
                  [email]
            );
}

const exibirUsuario = async () => {
  return await pool.query(`
    SELECT id_usuario, nome, email, ativo, created_at FROM usuarios
    
  `);
}

const atualizarUsuario = async (id_usuario, nome, email) => {
  return await pool.query(`
    UPDATE usuarios SET nome=$1, email=$2 WHERE id_usuario=$3 RETURNING id_usuario, nome, email, ativo, created_at
  `, [nome, email, id_usuario]);
}

const excluirUsuario = async (id_usuario) => {
  return await pool.query(`
    UPDATE usuarios SET ativo=false WHERE id_usuario=$1 RETURNING id_usuario, nome, email, ativo, created_at
  `, [id_usuario]);
}

module.exports = { buscarUsuario, exibirUsuario, atualizarUsuario, excluirUsuario };