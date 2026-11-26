// Imagens reais (arquivos em /assets)
export const images = {
  logo: require('../assets/BarkStoreLogo.png'),
  dog: require('../assets/dog.png'),
  cat: require('../assets/cat-banner.png'),
};

export const initialOrders = [
  { id: 'BS245873', date: '14/09/2026', status: 'Entregue', total: 257.31, items: [{ name: 'Special Dog Prime para Cães Adultos de Raças Grandes', qty: 1, price: 234.9 }, { name: 'Petisco Cremoso True Creamy Sabor Frango para Gatos', qty: 1, price: 22.41 }] },
  { id: 'BS198442', date: '02/08/2026', status: 'Entregue', total: 82.5, items: [{ name: 'Antipulgas Simparic 20 mg para Cães 5,1 a 10 kg', qty: 1, price: 82.5 }] },
];

export const initialPets = [
  { id: 1, name: 'Thor', type: 'Cão', emoji: '🐶', desc: 'Golden Retriever • 3 anos' },
  { id: 2, name: 'Luna', type: 'Gato', emoji: '🐱', desc: 'Gato SRD • 2 anos' },
];

export const frequencies = [
  { label: 'A cada 15 dias', days: 15 },
  { label: 'A cada 30 dias', days: 30 },
  { label: 'A cada 45 dias', days: 45 },
  { label: 'A cada 60 dias', days: 60 },
];

export const initialPlans = [
  { id: 1, petId: 1, productIds: [1, 3], days: 30, nextDelivery: '14/10/2026' },
  { id: 2, petId: 2, productIds: [2], days: 45, nextDelivery: '29/10/2026' },
];

export const initialAddresses = [{ id: 1, name: 'Casa', street: 'Rua das Flores', number: '123', district: 'Morumbi' }];
export const initialCards = [{ id: 1, label: 'Cartão de crédito', last4: '4582' }];
export const paymentMethods = ['Cartão de crédito', 'PIX', 'Boleto'];
export const states = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];