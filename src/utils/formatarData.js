function formatarDataHora(data) {
  if (!data) return null;
  return new Date(data).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
}
 
/**
 * Formata apenas a data, sem horário
 * Saída: DD/MM/AAAA
 * Ideal para: data_nascimento
 */
function formatarData(data) {
  if (!data) return null;
  return new Date(data).toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
}
 
module.exports = { formatarDataHora, formatarData };