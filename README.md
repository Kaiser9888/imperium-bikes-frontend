# 🏆 Imperium Bikes - Frontend

Marketplace premium de bicicletas e acessórios com design system exclusivo.

## 🎨 Design System

- **Cores Premium**: Ouro e tonalidades clássicas
- **Tipografia**: Cormorant Garamond + Inter
- **Componentes**: Totalmente responsivos
- **Acessibilidade**: WCAG compliant

## 🚀 Requisitos

- Node.js 16+
- npm ou yarn

## 📦 Instalação

```bash
npm install
```

## 🔧 Configuração

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o `.env` com sua URL de API:

```
VITE_API_URL=http://localhost:8080
```

## 💻 Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🏗️ Build

Para criar uma build de produção:

```bash
npm run build
```

## 📁 Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
│   ├── Header.jsx
│   ├── ProductCard.jsx
│   └── Footer.jsx      # 🆕 Footer com redes sociais
├── pages/            # Páginas da aplicação
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Registrar.jsx
│   ├── ProductDetail.jsx
│   ├── Profile.jsx
│   ├── MyListings.jsx
│   ├── CreateListing.jsx
│   ├── Favorites.jsx
│   ├── Chat.jsx
│   ├── Videos.jsx       # 🆕 Feed de vídeos
│   ├── Forum.jsx        # 🆕 Fórum de discussões
│   └── SocialFeed.jsx   # 🆕 Feed social
├── services/         # Integração com API
│   └── api.js
├── hooks/            # Hooks customizados
│   └── index.js
├── styles/           # CSS global e componentes
│   ├── theme.css
│   ├── header.css
│   ├── home.css
│   ├── auth.css
│   ├── productCard.css
│   ├── productDetail.css
│   ├── profile.css
│   ├── myListings.css
│   ├── createListing.css
│   ├── favorites.css
│   ├── chat.css
│   ├── videos.css      # 🆕
│   ├── forum.css       # 🆕
│   └── footer.css      # 🆕 Footer com redes sociais
├── App.jsx           # Componente principal
└── main.jsx          # Entry point
```

## 🔗 Integração com Backend

A aplicação conecta automaticamente com o backend em `http://localhost:8080`.

**Endpoints disponíveis:**
- `GET /api/anuncios` - Listar anúncios
- `GET /api/anuncios/:id` - Obter detalhe
- `POST /api/usuarios/login` - Login
- `POST /api/usuarios/registrar` - Registrar
- `GET/POST /api/favoritos` - Gerenciar favoritos
- `GET/POST /api/chat/conversas` - Chat
- `GET/POST /api/videos` - Feed de vídeos 🆕
- `GET/POST /api/forum/topicos` - Fórum de discussões 🆕
- `GET/POST /api/posts` - Feed social 🆕

## 🎯 Recursos Implementados

✅ Home com filtros
✅ Sistema de autenticação
✅ Catálogo de produtos
✅ Página de detalhe
✅ Sistema de favoritos
✅ Design premium responsivo
✅ **Feed de Vídeos** 🆕
✅ **Fórum de Discussões** 🆕
✅ **Feed Social** 🆕
✅ **Sistema de Curtidas** 🆕
✅ **Comentários** 🆕
✅ **Sistema de Destaques** 🆕
✅ **Checkout de Pagamentos** 🆕
✅ **Footer com Redes Sociais** 🆕
