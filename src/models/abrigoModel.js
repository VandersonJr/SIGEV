const pool = require("../config/db");

const criarAbrigo = async (
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
) => {
  return await pool.query(
    `
    INSERT INTO abrigo
      (
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
      )
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING
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
      status,
      created_at,
      updated_at
    `,
    [
      nome_abrigo,
      tipo_abrigo,
      cep,
      logradouro,
      numero || null,
      complemento || null,
      bairro,
      cidade,
      estado,
      latitude || null,
      longitude || null,
      capacidade_total,
    ]
  );
};

const exibirAbrigo = async (id_abrigo) => {
  return await pool.query(
    `
    SELECT
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
      status,
      created_at,
      updated_at
    FROM abrigo
    WHERE id_abrigo = $1
    `,
    [id_abrigo]
  );
};

const listarAbrigos = async () => {
  return await pool.query(
    `
    SELECT
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
      status,
      created_at,
      updated_at
    FROM abrigo
    ORDER BY id_abrigo ASC
    `
  );
};

const atualizarAbrigo = async (
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
) => {
  const campos = [];
  const valores = [];
  let indice = 1;

  if (nome_abrigo) {
    campos.push(`nome_abrigo = $${indice++}`);
    valores.push(nome_abrigo);
  }

  if (tipo_abrigo) {
    campos.push(`tipo_abrigo = $${indice++}`);
    valores.push(tipo_abrigo);
  }

  if (cep) {
    campos.push(`cep = $${indice++}`);
    valores.push(cep);
  }

  if (logradouro) {
    campos.push(`logradouro = $${indice++}`);
    valores.push(logradouro);
  }

  if (numero !== undefined) {
    campos.push(`numero = $${indice++}`);
    valores.push(numero || null);
  }

  if (complemento !== undefined) {
    campos.push(`complemento = $${indice++}`);
    valores.push(complemento || null);
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

  if (latitude !== undefined) {
    campos.push(`latitude = $${indice++}`);
    valores.push(latitude || null);
  }

  if (longitude !== undefined) {
    campos.push(`longitude = $${indice++}`);
    valores.push(longitude || null);
  }

  if (capacidade_total) {
    campos.push(`capacidade_total = $${indice++}`);
    valores.push(capacidade_total);
  }

  if (ocupacao_atual !== undefined) {
    campos.push(`ocupacao_atual = $${indice++}`);
    valores.push(ocupacao_atual);
  }

  if (status) {
    campos.push(`status = $${indice++}`);
    valores.push(status);
  }

  campos.push(`updated_at = NOW()`);

  valores.push(id_abrigo);

  return await pool.query(
    `
    UPDATE abrigo
    SET ${campos.join(", ")}
    WHERE id_abrigo = $${indice}
    RETURNING
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
      status,
      created_at,
      updated_at
    `,
    valores
  );
};

const excluirAbrigo = async (id_abrigo) => {
  return await pool.query(
    `
    UPDATE abrigo
    SET
      status = 'desativado',
      updated_at = NOW()
    WHERE id_abrigo = $1
    RETURNING
      id_abrigo,
      nome_abrigo,
      status,
      created_at,
      updated_at
    `,
    [id_abrigo]
  );
};

module.exports = {
  criarAbrigo,
  exibirAbrigo,
  listarAbrigos,
  atualizarAbrigo,
  excluirAbrigo,
};