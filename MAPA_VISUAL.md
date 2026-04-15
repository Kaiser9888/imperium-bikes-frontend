# 🗺️ Mapa Visual do Projeto

## 🏗️ Arquitetura Geral

```
┌─────────────────────────────────────────────────────┐
│          IMPERIUM BIKES FRONTEND                    │
│          React 18 + Vite + React Router             │
└─────────────────────────────────────────────────────┘
        │
        ├─ 🎨 Design System
        │  └─ Colors, Fonts, Components
        │
        ├─ 🧩 Componentes Reutilizáveis
        │  ├─ Header (sticky nav)
        │  └─ ProductCard (grid)
        │
        ├─ 📄 Pages (9 rotas)
        │  ├─ Home (filtros + grid)
        │  ├─ Login/Registrar
        │  ├─ ProductDetail
        │  ├─ Profile
        │  ├─ MyListings
        │  ├─ CreateListing
        │  ├─ Favorites
        │  └─ Chat
        │
        ├─ 🔗 API Integration
        │  ├─ Anúncios
        │  ├─ Usuários
        │  ├─ Favoritos
        │  └─ Chat
        │
        └─ 🎣 Hooks Customizados
           ├─ useFetch
           ├─ useAuth
           ├─ useForm
           ├─ usePagination
           ├─ useDebounce
           └─ useLocalStorage
```

---

## 🔄 Fluxo de Dados

```
┌──────────────────────────────────────────────────────────┐
│                      USER                                │
└──────────────────────────────────────────────────────────┘
        ↓                                  ↑
┌──────────────────────────────────────────────────────────┐
│           REACT COMPONENTS                               │
│  Header → Home/Page → State (useState) → Render         │
└──────────────────────────────────────────────────────────┘
        ↓                                  ↑
┌──────────────────────────────────────────────────────────┐
│              CUSTOM HOOKS                                │
│  useFetch, useForm, useAuth, etc                        │
└──────────────────────────────────────────────────────────┘
        ↓                                  ↑
┌──────────────────────────────────────────────────────────┐
│           API SERVICE (Axios)                            │
│  • Interceptors (auth, errors)                          │
│  • Headers automáticos                                  │
│  • Proxy para http://localhost:8080                    │
└──────────────────────────────────────────────────────────┘
        ↓                                  ↑
┌──────────────────────────────────────────────────────────┐
│        BACKEND API (Node.js + Express)                  │
│  • Autenticação (JWT)                                   │
│  • CRUD de Anúncios                                     │
│  • Chat em tempo real                                   │
│  • Gerenciamento de Usuários                           │
└──────────────────────────────────────────────────────────┘
        ↓                                  ↑
┌──────────────────────────────────────────────────────────┐
│           DATABASE (MySQL/PostgreSQL)                    │
│  • Users, Listings, Messages, Favorites                │
└──────────────────────────────────────────────────────────┘
```

---

## 📱 User Journey

```
1. Visita Home
   ├─ Vê produtos em grid
   └─ Clica em filtros
        │
2. Procura produto
   ├─ Busca por nome
   ├─ Filtra por categoria
   └─ Filtra por preço
        │
3. Vê detalhes
   ├─ Clica em ProductCard
   ├─ Vê galeria
   └─ Lê descrição
        │
4. Interesse em comprar
   ├─ Não está logado? → Redirect /login
   ├─ Está logado? → Chat com vendedor
   └─ Ou adiciona a Favoritos
        │
5. Chat
   ├─ Inicia conversa
   ├─ Envia mensagens
   └─ Vendedor responde
        │
6. Acerta detalhes
   └─ Realiza compra (fora do app)
```

---

## 🎨 Component Tree

```
App.jsx
├── Router
├── Header.jsx
│   ├── Logo
│   ├── Nav Links
│   └── User Menu
│       └── Dropdown
│
└── Routes
    ├── Home.jsx
    │   ├── Hero Section
    │   ├── Filters (useForm)
    │   └── Products Grid
    │       └── ProductCard (x N)
    │           ├── Image
    │           ├── Info
    │           └── Buttons
    │
    ├── Login.jsx
    │   └── Form (useForm)
    │
    ├── Registrar.jsx
    │   └── Form (useForm)
    │
    ├── ProductDetail.jsx
    │   ├── Gallery
    │   ├── Info
    │   ├── Seller
    │   └── Actions
    │
    ├── Profile.jsx
    │   ├── User Info
    │   └── Edit Form (useForm)
    │
    ├── MyListings.jsx
    │   └── Table (usePagination)
    │       └── Actions
    │
    ├── CreateListing.jsx
    │   └── Form (useForm)
    │       ├── Básico
    │       ├── Técnico
    │       └── Upload
    │
    ├── Favorites.jsx
    │   └── Grid
    │       └── ProductCard (x N)
    │
    └── Chat.jsx
        ├── Sidebar (conversas)
        ├── Header
        ├── Messages
        └── Input Form
```

---

## 🎯 State Management

```
App Level
├── User Authentication (useAuth)
│   ├── user
│   ├── isLogged
│   ├── token
│   └── Methods: login, logout
│
└── Global State
    └── (localStorage)
        ├── token
        ├── user data
        └── preferences

Page Level
├── Home
│   ├── anuncios
│   ├── filtros
│   └── loading
│
├── ProductDetail
│   ├── anuncio
│   ├── favorito
│   └── loading
│
├── Chat
│   ├── conversas
│   ├── mensagens
│   └── conversaAtual
│
└── Forms
    └── formData (useForm)
        ├── titulo
        ├── preco
        ├── descricao
        └── ...
```

---

## 🔌 API Integration Map

```
Frontend           Backend Endpoints           Database
─────────          ──────────────────         ────────

Home               GET /api/anuncios          Anúncios
├─ listando        ├─ ?categoria
├─ filtrando       ├─ ?precoMin
└─ buscando        ├─ ?precoMax
                   └─ ?busca

ProductDetail      GET /api/anuncios/:id      Anúncios
└─ carregando      POST /api/favoritos        Favoritos

Chat               GET /api/chat/conversas    Mensagens
├─ conversas       POST /api/chat/conversas   Conversas
├─ mensagens       POST /api/mensagens        
└─ enviando        GET /api/mensagens

Auth               POST /api/usuarios/login   Usuários
├─ login           POST /api/usuarios/register
└─ registrar       GET /api/usuarios/me

Profile            GET /api/usuarios/:id      Usuários
├─ carregando       PUT /api/usuarios/:id
└─ editando

MyListings         GET /api/anuncios/usuario  Anúncios
├─ carregando      DELETE /api/anuncios/:id
└─ deletando       PUT /api/anuncios/:id

CreateListing      POST /api/anuncios         Anúncios
└─ criando         PUT /api/anuncios/:id
```

---

## 📱 Responsive Layout

```
Desktop (1440px+)
┌─────────────────────────────────────────────────┐
│ LOGO      NAV      USER                         │
├─────────────────────────────────────────────────┤
│ [Product] [Product] [Product] [Product]        │
│ [Product] [Product] [Product] [Product]        │
└─────────────────────────────────────────────────┘

Tablet (768-1023px)
┌──────────────────────┐
│ LOGO    NAV    USER  │
├──────────────────────┤
│ [Product] [Product]  │
│ [Product] [Product]  │
└──────────────────────┘

Mobile (< 768px)
┌────────────────────┐
│ ☰ LOGO    MENU    │
├────────────────────┤
│ [Product]          │
│ [Product]          │
└────────────────────┘
```

---

## 🎨 CSS Architecture

```
theme.css (Fundação)
├── :root (variáveis)
│   ├── Colors (12+)
│   ├── Spacing
│   ├── Shadows
│   ├── Z-index
│   └── Fonts
│
├── Global Reset
│   ├── * { margin, padding, box-sizing }
│   ├── html { scroll-behavior }
│   └── body { font-family, background }
│
└── Global Elements
    ├── h1-h6 (tipografia)
    ├── a (links)
    ├── button (reset)
    └── inputs (reset)

Page-specific CSS
├── header.css (70+ linhas)
├── home.css (100+ linhas)
├── productCard.css (120+ linhas)
├── productDetail.css (150+ linhas)
├── auth.css (100+ linhas)
├── profile.css (150+ linhas)
├── myListings.css (100+ linhas)
├── createListing.css (150+ linhas)
├── favorites.css (80+ linhas)
└── chat.css (140+ linhas)

Total: ~1500+ linhas de CSS
```

---

## 🔐 Security Flow

```
Login
├── Enviar email + senha
├── Backend valida
├── Retorna token JWT
├── Frontend armazena em localStorage
└── API adiciona header Authorization

Cada Requisição
├── Interceptor verifica token
├── Adiciona ao header
├── Backend valida JWT
├── Executa ação
└── Retorna dados

Logout
├── Remove token do localStorage
├── Remove dados do usuário
├── Redireciona para /login
└── Próxima requisição sem token
```

---

## 📊 Performance Optimization

```
Frontend Optimization
├── Vite (fast build)
├── Code splitting (lazy loading)
├── CSS-in-JS variables
├── Debounce para buscas
├── Paginação (não carrega tudo)
└── Local caching (localStorage)

Backend Integration
├── API batching (reduz requests)
├── Caching (Redis)
├── Compression (gzip)
└── CDN para imagens
```

---

## 🚀 Deployment Flow

```
Local Development
├── npm run dev (hot reload)
├── Testa funcionalidades
└── Valida integração

Build
├── npm run build (otimiza)
├── Cria pasta dist/
└── Minifica CSS/JS

Deploy
├── Vercel / Netlify
├── GitHub → Auto deploy
├── Environment variables
└── HTTPS automático

Production
└── https://imperium-bikes.com
```

---

## 📈 Growth Path

```
v1.0 (Atual)
├── CRUD básico
├── Chat simples
└── Design sistema

v1.1 (Next)
├── Notificações
├── Paginação real
├── Upload em S3
└── Pesquisa avançada

v2.0 (Futuro)
├── Pagamento integrado
├── Real-time notifications
├── Mobile app (React Native)
└── Dashboard vendedor
```

---

**Mapa visual completo da Imperium Bikes! 🗺️**

