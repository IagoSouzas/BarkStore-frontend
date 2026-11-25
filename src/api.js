import { API_URL } from './config.js';

let token = null;

export function setToken(value) {
  token = value;
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
