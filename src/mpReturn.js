// Lê a URL de retorno do Mercado Pago sem depender de URL/searchParams (nem sempre disponíveis no Hermes).
const RESULTADOS = ['sucesso', 'falha', 'pendente'];

function parseQuery(query) {
  const out = {};
  if (!query) return out;
  for (const part of query.split('&')) {
    if (!part) continue;
    const [chave, valor = ''] = part.split('=');
    out[decodeURIComponent(chave)] = decodeURIComponent(valor.replace(/\+/g, ' '));
  }
  return out;
}

function montar(status, pedido, paymentId) {
  if (!pedido || !RESULTADOS.includes(status)) return null;
  return { pedidoId: pedido, status, paymentId: paymentId || null };
}

// Retorna { pedidoId, status, paymentId } quando a URL é o retorno do pagamento; senão null.
// Aceita o deep link barkstore://pagamento/retorno?... e a URL https /pagamentos/retorno/<status>?external_reference=...
export function parseMpReturn(url) {
  if (typeof url !== 'string') return null;
  const semFragmento = url.split('#')[0];
  const [base, query = ''] = semFragmento.split('?');
  const q = parseQuery(query);

  if (base.startsWith('barkstore://pagamento/retorno')) {
    return montar(q.status, q.pedido, q.paymentId);
  }
  if (base.includes('/pagamentos/retorno/')) {
    const status = base.split('/').pop();
    return montar(status, q.external_reference, q.payment_id);
  }
  return null;
}
