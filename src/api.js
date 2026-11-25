import { API_URL } from './config.js';

let token = null;

export function setToken(value) {
  token = value;
}

// Cria o usuário no backend (POST /usuarios).
export async function cadastrar(nomeCompleto, email, senha) {
  await apiFetch('/usuarios', { method: 'POST', body: { nomeCompleto, email, senha } });
}

// Autentica no backend e guarda o JWT para as próximas chamadas.
export async function login(email, senha) {
  const response = await apiFetch('/auth/login', { method: 'POST', body: { email, senha } });
  setToken(response.token);
}

// Chama a API do backend. Lança Error com a mensagem do ApiError quando a resposta não é 2xx.
export async function apiFetch(path, options = {}) {
  const headers = { Accept: 'application/json' };
  if (options.body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error((data && data.message) || `Erro ${response.status}`);
  }
  return data;
}
