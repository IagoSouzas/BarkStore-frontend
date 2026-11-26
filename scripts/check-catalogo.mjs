// Verificação sem dispositivo do mapeamento da API para o formato do app. Rodar: node --experimental-default-type=module scripts/check-catalogo.mjs
import assert from 'node:assert/strict';
import { adaptarProduto, adaptarCategoria, adaptarUsuario } from '../src/catalogo.js';

assert.deepStrictEqual(
  adaptarProduto({
    id: 1, nome: 'Special Dog Prime para Cães Adultos de Raças Grandes', nomeCurto: 'Special Dog Prime',
    descricao: 'Ração premium', preco: 234.9, avaliacao: 4.8, avaliacoes: 124, destaque: true,
    emoji: '🐕', imagemChave: 'prime', categorias: ['cachorro'],
  }),
  {
    id: 1, name: 'Special Dog Prime para Cães Adultos de Raças Grandes', shortName: 'Special Dog Prime',
    description: 'Ração premium', price: 234.9, rating: 4.8, reviews: 124, featured: true,
    emoji: '🐕', bg: '#E5E7EB', categories: ['cachorro'],
  },
);

assert.deepStrictEqual(
  adaptarCategoria({ id: 'gato', titulo: 'Comida para gato', emoji: '🐱', cor: '#FBCFE8' }),
  { id: 'gato', title: 'Comida para gato', emoji: '🐱', color: '#FBCFE8' },
);

assert.deepStrictEqual(
  adaptarUsuario({ id: 7, nomeCompleto: 'Ana Silva', email: 'ana@x.com' }),
  { name: 'Ana Silva', email: 'ana@x.com', phone: '' },
);

console.log('ok');
