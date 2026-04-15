# 🚀 Imperium Bikes - Guia Completo de Uso

## 📋 Índice
1. [Instalação](#instalação)
2. [Configuração](#configuração)
3. [Desenvolvimento](#desenvolvimento)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Componentes Principais](#componentes-principais)
6. [Boas Práticas](#boas-práticas)
7. [Deploy](#deploy)
8. [Troubleshooting](#troubleshooting)

---

## 📦 Instalação

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn
- Backend rodando em http://localhost:8080

### Passo 1: Clonar ou abrir projeto

```bash
cd imperium-bikes-frontend
```

### Passo 2: Instalar dependências

**Windows (recomendado):**
```bash
./setup.bat
```

**Mac/Linux:**
```bash
bash setup.sh
```

**Manual:**
```bash
npm install
```

### Passo 3: Configurar ambiente

```bash
cp .env.example .env
```

Edite o `.env` se necessário:
```
VITE_API_URL=http://localhost:8080
```

---

## ⚙️ Configuração

### Primeira Execução

1. Certifique-se de que o backend está rodando:
   ```bash
   # Em outro terminal
   cd ../backend
   npm start
   ```

2. Inicie o frontend:
   ```bash
   npm run dev
   ```

3. Abra http://localhost:5173 no navegador

### Variáveis de Ambiente

```env
# .env
VITE_API_URL=http://localhost:8080
```

Para produção, defina:
```env
VITE_API_URL=https://api.imperium-bikes.com
```

---

## 💻 Desenvolvimento

### Iniciar Servidor Dev
```bash
npm run dev
```

- Servidor em http://localhost:5173
- Hot reload automático
- Proxy para API configurado

### Build para Produção
```bash
npm run build
```

Cria pasta `dist/` com arquivos otimizados

### Preview de Build
```bash
npm run preview
```

Testa a build localmente antes de deploy

---

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── Header.jsx
│   └── ProductCard.jsx
│
├── pages/               # Páginas/Views
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Registrar.jsx
│   ├── ProductDetail.jsx
│   ├── Profile.jsx
│   ├── MyListings.jsx
│   ├── CreateListing.jsx
│   ├── Favorites.jsx
│   └── Chat.jsx
│
├── services/           # Integração com API
│   └── api.js          # Axios client com interceptors
│
├── styles/             # CSS global e por página
│   ├── theme.css       # Design system
│   ├── header.css
│   ├── home.css
│   ├── auth.css
│   ├── productCard.css
│   ├── productDetail.css
│   ├── profile.css
│   ├── myListings.css
│   ├── createListing.css
│   ├── favorites.css
│   └── chat.css
│
├── App.jsx             # Router principal
├── main.jsx            # Entry point
```

---

## 🧩 Componentes Principais

### Header
Componente sticky com:
- Logo Imperium
- Navegação
- Ações de usuário (Login/Logout)
- Menu responsivo

**Localização:** `src/components/Header.jsx`

**Uso:**
```jsx
import Header from './components/Header';
// Importado automaticamente em App.jsx
```

### ProductCard
Card de produto com:
- Imagem e overlay
- Título e descrição
- Preço formatado
- Reputação do vendedor
- Badge de destaque

**Localização:** `src/components/ProductCard.jsx`

**Uso:**
```jsx
<ProductCard anuncio={anuncioData} />
```

### Páginas

#### Home
- Hero section
- Sistema de filtros
- Grid de produtos
- Integração com API

#### Login/Registrar
- Formulários validados
- Armazenamento de token
- Redirecionamento automático

#### ProductDetail
- Galeria de imagens
- Informações completas
- Favoritos
- Chat com vendedor

#### Profile
- Dados pessoais
- Edição de perfil
- Reputação

#### MyListings
- Tabela de anúncios
- CRUD de produtos
- Status de anúncio

#### CreateListing
- Formulário completo
- Upload de imagens
- Edição de anúncio

#### Favorites
- Lista de favoritos
- Remover favoritos

#### Chat
- Lista de conversas
- Mensagens em tempo real
- Interface clean

---

## ✅ Boas Práticas

### 1. Variáveis CSS
Sempre use variáveis do tema:

```css
/* ❌ Errado */
background-color: #b09b82;

/* ✅ Correto */
background-color: var(--gold-main);
```

### 2. Componentes
- Manter componentes pequenos e focados
- Usar props para passar dados
- Separar lógica em hooks customizados

```jsx
// ✅ Bom
export default function ProductCard({ anuncio }) {
  return (
    <article className="product-card">
      {/* ... */}
    </article>
  );
}
```

### 3. Estilos
- Um arquivo CSS por página/componente
- Usar nomenclatura BEM
- Mobile-first, depois desktop

```css
/* ✅ Bom */
.product-card {
  /* estilos base */
}

.product-card:hover {
  /* estilos hover */
}

.product-card-title {
  /* elemento */
}

@media (max-width: 768px) {
  /* versão mobile */
}
```

### 4. API Calls
Use o client pré-configurado:

```jsx
import { anunciosAPI } from '../services/api';

const response = await anunciosAPI.listar(filtros);
```

### 5. Estado Local
```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [erro, setErro] = useState('');

useEffect(() => {
  carregarDados();
}, []);
```

### 6. Autenticação
Token está em localStorage:

```jsx
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));
```

---

## 🚀 Deploy

### Vercel (Recomendado)

1. Push para GitHub:
```bash
git add .
git commit -m "initial commit"
git push origin main
```

2. Conectar no Vercel:
- Vá para https://vercel.com
- Importe repositório
- Configure variável de ambiente
- Deploy automático

### Netlify

```bash
npm run build
# Fazer deploy da pasta `dist/`
```

### Dockerfile para Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

---

## 🐛 Troubleshooting

### Erro: Cannot find module '@vitejs/plugin-react'
```bash
npm install
npm run dev
```

### Erro: Port 5173 already in use
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5173
kill -9 <PID>
```

### Erro: CORS issues
Verifique se o backend permite CORS:
```javascript
// Backend
app.use(cors({
  origin: 'http://localhost:5173'
}));
```

### Erro: Token expirado
Frontend redireciona automaticamente para /login

### Erro: Imagens não carregam
- Verifique URLs das imagens
- Certifique-se de ter permissão CORS
- Use placeholder como fallback

### API retorna 404
- Verifique se backend está rodando
- Confirme URL em .env
- Verifique endpoints no API_DOCS.md

---

## 📚 Recursos Úteis

- **Design System**: `DESIGN_SYSTEM.md`
- **API Docs**: `API_DOCS.md`
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Tailwind (alternativa)**: https://tailwindcss.com

---

## 👨‍💻 Desenvolvimento Rápido

### Criar novo componente
1. Criar arquivo em `src/components/NomeComponente.jsx`
2. Criar CSS em `src/styles/nomeComponente.css`
3. Importar e usar

### Criar nova página
1. Criar arquivo em `src/pages/NomePagina.jsx`
2. Criar CSS em `src/styles/nomePagina.css`
3. Adicionar rota em `App.jsx`
4. Adicionar link no Header se necessário

### Chamar API
```jsx
import { anunciosAPI } from '../services/api';

const dados = await anunciosAPI.listar();
```

---

## 📝 Checklist Pré-Deploy

- [ ] Testou em produção localmente (`npm run build`)
- [ ] Atualizou variáveis de ambiente
- [ ] Testou responsividade em mobile
- [ ] Verificou console para erros
- [ ] Testou autenticação
- [ ] Testou upload de imagens
- [ ] Verificou links de navegação
- [ ] Testou performance (PageSpeed)

---

## 🤝 Contribuindo

Para adicionar features:

1. Crie uma branch: `git checkout -b feature/nome`
2. Faça as mudanças
3. Teste tudo
4. Commit: `git commit -m "feat: descrição"`
5. Push: `git push origin feature/nome`
6. Abra um Pull Request

---

## 📞 Suporte

Para dúvidas sobre integração com o backend, veja `API_DOCS.md`

---

**Desenvolvido com ❤️ para Imperium Bikes**

v1.0.0 - 2024

