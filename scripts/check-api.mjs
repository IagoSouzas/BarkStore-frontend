// Verificação sem dispositivo do cliente de API (src/api.js). Rodar: node scripts/check-api.mjs
import assert from 'node:assert/strict';
import { setToken, apiFetch, login } from '../src/api.js';

const calls = [];
globalThis.fetch = async (url, init = {}) => {
  calls.push({ url, init });
  const next = responses.shift();
  return next;
};
const responses = [];
const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

// 1) apiFetch envia o token e o corpo em JSON
setToken('t');
responses.push(json(200, { ok: true }));
await apiFetch('/x', { method: 'POST', body: { a: 1 } });
assert.equal(calls[0].init.headers.Authorization, 'Bearer t');
assert.equal(calls[0].init.method, 'POST');
assert.equal(calls[0].init.body, '{"a":1}');

// 2) erro 400 do backend vira Error com a mensagem do ApiError
responses.push(json(400, { message: 'Carrinho vazio' }));
await assert.rejects(() => apiFetch('/pedidos', { method: 'POST' }), { message: 'Carrinho vazio' });

// 3) login guarda o JWT e o usa nas chamadas seguintes
setToken(null);
responses.push(json(200, { token: 'jwt', type: 'Bearer', expiresIn: 1 }));
await login('a@b.com', '123456');
responses.push(json(200, {}));
await apiFetch('/y');
assert.equal(calls[calls.length - 1].init.headers.Authorization, 'Bearer jwt');

// 4) login com credenciais inválidas rejeita com a mensagem do backend
responses.push(json(401, { message: 'E-mail ou senha inválidos' }));
await assert.rejects(() => login('a@b.com', 'errada'), { message: 'E-mail ou senha inválidos' });

console.log('ok');
