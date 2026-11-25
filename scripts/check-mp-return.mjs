// Verificação sem dispositivo da leitura da URL de retorno do Mercado Pago. Rodar: node --experimental-default-type=module scripts/check-mp-return.mjs
import assert from 'node:assert/strict';
import { parseMpReturn } from '../src/mpReturn.js';

// 1) deep link do app (vindo do redirect do backend)
assert.deepStrictEqual(
  parseMpReturn('barkstore://pagamento/retorno?pedido=7&status=sucesso&paymentId=99'),
  { pedidoId: '7', status: 'sucesso', paymentId: '99' },
);

// 2) URL https de retorno (back_url do Mercado Pago, antes do redirect)
assert.deepStrictEqual(
  parseMpReturn('https://api.example/pagamentos/retorno/falha?external_reference=7&payment_id=5'),
  { pedidoId: '7', status: 'falha', paymentId: '5' },
);

// 3) URL que não é retorno
assert.equal(parseMpReturn('https://www.mercadopago.com.br/checkout/v1/redirect'), null);

// 4) retorno sem pedido não serve
assert.equal(parseMpReturn('barkstore://pagamento/retorno'), null);

console.log('ok');
