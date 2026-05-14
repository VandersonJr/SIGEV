const pool = require("../config/db");

const criarPessoa = async (
  user_id,
  cpf,
  data_nascimento,
  genero,
  telefone,
  cep,
  bairro,
  cidade,
  estado
) => {
  return await pool.query(
    `
    INSERT INTO pessoas 
      (user_id, cpf, data_nascimento, genero, telefone, cep, bairro, cidade, estado)
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING 
      id_pessoa, user_id, cpf, data_nascimento, genero, telefone, cep, bairro, cidade, estado, created_at, updated_at
    `,
    [user_id, cpf, data_nascimento, genero || null, telefone, cep, bairro, cidade, estado]
  );
};

const exibirPessoa = async (id_pessoa) => {
  return await pool.query(
    `
    SELECT
      p.id_pessoa,
      p.user_id,
      p.cpf,
      p.data_nascimento,
      p.genero,
      p.telefone,
      p.cep,
      p.bairro,
      p.cidade,
      p.estado,
      u.nome,
      p.created_at,
      p.updated_at
    FROM pessoas p
    INNER JOIN usuarios u ON u.id_usuario = p.user_id
    WHERE p.id_pessoa = $1
    `,
    [id_pessoa]
  );
};

const listarPessoas = async () => {
  return await pool.query(
    `
    SELECT
      p.id_pessoa,
      p.user_id,
      p.cpf,
      p.data_nascimento,
      p.genero,
      p.telefone,
      p.cep,
      p.bairro,
      p.cidade,
      p.estado,
      u.nome,
      p.created_at,
      p.updated_at
    FROM pessoas p
    INNER JOIN usuarios u ON u.id_usuario = p.user_id
    ORDER BY p.id_pessoa ASC
    `
  );
};

const atualizarPessoa = async (
  id_pessoa,
  cpf,
  data_nascimento,
  genero,
  telefone,
  cep,
  bairro,
  cidade,
  estado
) => {
  const campos = [];
  const valores = [];
  let indice = 1;

  if (cpf) {
    campos.push(`cpf = $${indice++}`);
    valores.push(cpf);
  }

  if (data_nascimento) {
    campos.push(`data_nascimento = $${indice++}`);
    valores.push(data_nascimento);
  }

  if (genero !== undefined) {
    campos.push(`genero = $${indice++}`);
    valores.push(genero || null);
  }

  if (telefone) {
    campos.push(`telefone = $${indice++}`);
    valores.push(telefone);
  }

  if (cep) {
    campos.push(`cep = $${indice++}`);
    valores.push(cep);
  }

  if (bairro) {
    campos.push(`bairro = $${indice++}`);
    valores.push(bairro);
  }

  if (cidade) {
    campos.push(`cidade = $${indice++}`);
    valores.push(cidade);
  }

  if (estado) {
    campos.push(`estado = $${indice++}`);
    valores.push(estado);
  }

  campos.push(`updated_at = NOW()`);
  valores.push(id_pessoa);

  return await pool.query(
    `
    UPDATE pessoas
    SET ${campos.join(", ")}
    WHERE id_pessoa = $${indice}
    RETURNING 
      id_pessoa, user_id, cpf, data_nascimento, genero, telefone, cep, bairro, cidade, estado, created_at, updated_at
    `,
    valores
  );
};

const excluirPessoa = async (id_pessoa) => {
  return await pool.query(
    `
    DELETE FROM pessoas
    WHERE id_pessoa = $1
    RETURNING 
      id_pessoa, user_id, cpf, data_nascimento, genero, telefone, cep, bairro, cidade, estado, created_at, updated_at
    `,
    [id_pessoa]
  );
};

module.exports = {
  criarPessoa,
  exibirPessoa,
  listarPessoas,
  atualizarPessoa,
  excluirPessoa,
};