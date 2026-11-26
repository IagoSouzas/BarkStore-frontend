// Converte os dados da API (backend) para o formato que as telas do app usam. Sem imports: testável no Node.

export function adaptarProduto(p) {
  return {
    id: p.id,
    name: p.nome,
    shortName: p.nomeCurto,
    description: p.descricao,
    price: p.preco,
    rating: p.avaliacao,
    reviews: p.avaliacoes,
    featured: p.destaque,
    emoji: p.emoji,
    bg: '#E5E7EB',
    categories: p.categorias,
  };
}

export function adaptarCategoria(c) {
  return { id: c.id, title: c.titulo, emoji: c.emoji, color: c.cor };
}

export function adaptarUsuario(u) {
  return { name: u.nomeCompleto, email: u.email, phone: '' };
}
