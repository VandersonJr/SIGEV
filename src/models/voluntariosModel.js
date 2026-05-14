const pool = require("../config/db");

const criarVoluntario = async (
  pessoa_id,
  abrigo_id,
  especialidade,
  ativo
) => {
  return await pool.query(
    `
    INSERT INTO voluntarios
      (
        pessoa_id,
        abrigo_id,
        especialidade,
        ativo
      )
    VALUES
      ($1, $2, $3, $4)
    RETURNING
      id_voluntario,
      pessoa_id,
      abrigo_id,
      especialidade,
      ativo
    `,
    [pessoa_id, abrigo_id, especialidade, ativo ?? true]
  );
};

const exibirVoluntario = async (id_voluntario) => {
  return await pool.query(
    `
    SELECT
      v.id_voluntario,
      v.pessoa_id,
      v.abrigo_id,
      p.cpf,
      u.nome,
      v.especialidade,
      v.ativo
    FROM voluntarios v
    INNER JOIN pessoas p
      ON p.id_pessoa = v.pessoa_id
    INNER JOIN usuarios u
      ON u.id_usuario = p.user_id
    WHERE v.id_voluntario = $1
    `,
    [id_voluntario]
  );
};

const listarVoluntarios = async () => {
  return await pool.query(
    `
    SELECT
      v.id_voluntario,
      v.pessoa_id,
      v.abrigo_id,
      p.cpf,
      u.nome,
      v.especialidade,
      v.ativo
    FROM voluntarios v
    INNER JOIN pessoas p
      ON p.id_pessoa = v.pessoa_id
    INNER JOIN usuarios u
      ON u.id_usuario = p.user_id
    ORDER BY v.id_voluntario ASC
    `
  );
};

const atualizarVoluntario = async (
  id_voluntario,
  abrigo_id,
  especialidade,
  ativo
) => {
  const campos = [];
  const valores = [];
  let indice = 1;

  if (abrigo_id !== undefined) {
    campos.push(`abrigo_id = $${indice++}`);
    valores.push(abrigo_id);
  }

  if (especialidade !== undefined) {
    campos.push(`especialidade = $${indice++}`);
    valores.push(especialidade);
  }

  if (ativo !== undefined) {
    campos.push(`ativo = $${indice++}`);
    valores.push(ativo);
  }

  valores.push(id_voluntario);

  return await pool.query(
    `
    UPDATE voluntarios
    SET ${campos.join(", ")}
    WHERE id_voluntario = $${indice}
    RETURNING
      id_voluntario,
      pessoa_id,
      abrigo_id,
      especialidade,
      ativo
    `,
    valores
  );
};

const excluirVoluntario = async (id_voluntario) => {
  return await pool.query(
    `
    UPDATE voluntarios
    SET ativo = false
    WHERE id_voluntario = $1
    RETURNING
      id_voluntario,
      pessoa_id,
      abrigo_id,
      especialidade,
      ativo
    `,
    [id_voluntario]
  );
};

module.exports = {
  criarVoluntario,
  exibirVoluntario,
  listarVoluntarios,
  atualizarVoluntario,
  excluirVoluntario,
};