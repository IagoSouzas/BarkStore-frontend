# Bark Store — Frontend

App da loja de produtos para pets, feito com Expo (React Native 0.81, React 19). Roda no celular (Expo Go) e no navegador. Os produtos, as categorias e os dados do usuário vêm da API do backend.

## Pré-requisitos

- **Node.js 22**
- **Expo Go** no celular (ou um emulador Android/iOS, ou o navegador)
- **Backend em execução** com um túnel ngrok (ver o README do backend)
- **Chave do Mercado Pago:** a **Public Key de teste** é necessária para a versão web do pagamento (o checkout em Android/iOS usa só o backend).

## Configuração

Crie o arquivo `.env` na raiz deste projeto (ele não vai para o git):

```
EXPO_PUBLIC_API_URL=https://SUA-URL.ngrok-free.dev   # URL pública do backend (sem barra no final)
EXPO_PUBLIC_MP_PUBLIC_KEY=APP_USR-...                # Public Key de TESTE do Mercado Pago
EXPO_PUBLIC_APP_ENV=development
```

Use a mesma URL do ngrok que está em `APP_PUBLIC_URL` no backend. Se ela mudar, atualize este arquivo e reinicie o Expo.

## Executar

```bash
npm install --legacy-peer-deps     # só na primeira vez
npx expo start                     # celular: leia o QR code com o Expo Go
npx expo start --web               # navegador
```

No navegador, a API precisa aceitar a origem do app. Por padrão o backend aceita `localhost:8081`, `8082` e `19006`. Se o Expo usar outra porta, ajuste `CORS_ALLOWED_ORIGINS` no backend.

## Verificações

Não há test runner; estes scripts conferem a lógica sem dispositivo:

```bash
node --experimental-default-type=module scripts/check-api.mjs
node --experimental-default-type=module scripts/check-catalogo.mjs
node --experimental-default-type=module scripts/check-mp-return.mjs
npx expo export --platform android    # confere se o bundle compila
npx expo export --platform web
```

## Fluxo de uso

1. Crie uma conta ou entre com uma conta existente.
2. Navegue pelos produtos, adicione ao carrinho e toque em **Finalizar compra** → **Pagar**.
3. O app abre o checkout do Mercado Pago (sandbox). Pague com um **cartão de teste** e o **usuário de teste** do painel do Mercado Pago. Use uma janela anônima ou saia da sua conta pessoal, senão o checkout entra direto nela.
4. Ao voltar, a tela de confirmação mostra o status real do pedido.

## O que vem da API

| Dado | Fonte |
|---|---|
| Produtos e categorias | `GET /produtos`, `GET /categorias` (ao abrir o app) |
| Nome e e-mail do usuário | `GET /usuarios/me` (após login ou cadastro) |
| Edição de perfil | `PUT /usuarios/me` |
| Pagamento | `POST /pagamentos/checkout` |

Carrinho, favoritos, planos, pedidos, pets, endereços e cartões ainda usam dados locais.

## Observações

- O token de login fica só na memória: ao recarregar a página, é preciso entrar de novo.
- Não guarde chaves ou senhas no código. O `.env` já está no `.gitignore`.
