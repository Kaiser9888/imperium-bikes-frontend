# 🔒 Segurança e Boas Práticas

## 🚨 Segurança do Frontend

### 1. Nunca Expor Dados Sensíveis

```javascript
// ❌ ERRADO
const API_KEY = "sk_live_4e3...";
export const apiKey = API_KEY;

// ✅ CORRETO
// Use variáveis de ambiente
const API_KEY = import.meta.env.VITE_API_KEY;
// Nunca exponha no cliente!
```

### 2. Validar Inputs

```javascript
// ❌ ERRADO
<input value={userInput} onChange={e => setHtml(e.target.value)} />

// ✅ CORRETO
const validarEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
```

### 3. Sanitizar Dados

```javascript
// ❌ ERRADO
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ CORRETO
import DOMPurify from 'dompurify';
<div>{DOMPurify.sanitize(userContent)}</div>
```

### 4. HTTPS em Produção

```javascript
// ✅ Sempre use HTTPS
VITE_API_URL=https://api.imperium-bikes.com
```

### 5. CORS Configurado

```javascript
// Backend deve configurar CORS corretamente
app.use(cors({
  origin: 'https://imperium-bikes.com',
  credentials: true
}));
```

---

## 🔐 Gerenciamento de Token

### Armazenamento Seguro

```javascript
// localStorage é OK para JWT simples
localStorage.setItem('token', token);

// Mas considere sessionStorage para mais segurança
sessionStorage.setItem('token', token);

// Melhor: Use HTTP-only cookies (backend)
// Frontend não pode acessar = mais seguro!
```

### Refresh Token

```javascript
// Implemente rotation de token
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const newToken = await refreshToken();
      localStorage.setItem('token', newToken);
      return api(error.config);
    }
    return Promise.reject(error);
  }
);
```

### Logout Seguro

```javascript
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Opcionalmente: notifique backend
  api.post('/logout');
  navigate('/login');
};
```

---

## 🛡️ Proteção de Rotas

### Route Guards

```javascript
// ✅ CORRETO
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

// Uso
<Routes>
  <Route path="/perfil" element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  } />
</Routes>
```

---

## ⚠️ Validação de Dados

### Validação no Frontend

```javascript
// ✅ Sempre valide
function validarFormulario(dados) {
  const erros = {};
  
  if (!dados.email || !dados.email.includes('@')) {
    erros.email = 'Email inválido';
  }
  
  if (dados.senha.length < 8) {
    erros.senha = 'Senha deve ter no mínimo 8 caracteres';
  }
  
  return erros;
}
```

### Validação de API Response

```javascript
// ✅ Valide respostas da API
api.interceptors.response.use(response => {
  // Verificar estrutura esperada
  if (!response.data || typeof response.data !== 'object') {
    throw new Error('Resposta inválida da API');
  }
  return response;
});
```

---

## 🔍 Prevenção de Ataques

### XSS (Cross-Site Scripting)

```javascript
// ❌ VULNERÁVEL
<div>{userContent}</div> // Se contiver script tag

// ✅ SEGURO (React sanitiza por padrão)
<div>{userContent}</div>

// Ainda melhor
import DOMPurify from 'dompurify';
<div>{DOMPurify.sanitize(userContent)}</div>
```

### CSRF (Cross-Site Request Forgery)

```javascript
// Backend deve retornar CSRF token
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

// Incluir em headers
api.interceptors.request.use(config => {
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }
  return config;
});
```

### SQL Injection

```javascript
// ❌ NUNCA construa queries no frontend
// Isso é responsabilidade do backend!

// ✅ CORRETO - Backend sanitiza
// Envie dados estruturados
api.get('/api/anuncios', { 
  params: { categoria: 'mountain' }
});
```

---

## 📝 Boas Práticas de Código

### 1. Dependências Seguras

```bash
# Verifique vulnerabilidades
npm audit

# Atualize regularly
npm update
```

### 2. Variáveis de Ambiente

```env
# .env (NUNCA commitar!)
VITE_API_URL=http://localhost:8080

# .env.example (para documentar)
VITE_API_URL=
```

### 3. Secrets em Production

```bash
# Vercel
vercel env add VITE_API_URL
vercel env add VITE_API_KEY

# Netlify
# Configura via UI
```

### 4. Rate Limiting (no backend)

```javascript
// Backend deve implementar
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // 100 requisições
}));
```

---

## 🔒 Content Security Policy

### No HTML

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';">
```

---

## 📊 Monitoramento

### Erros em Produção

```javascript
// Implemente error tracking
import Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: 'production'
});

// Capture erros
try {
  // código
} catch (error) {
  Sentry.captureException(error);
}
```

### Analytics Seguro

```javascript
// Use ferramenta confiável
gtag('event', 'login', {
  method: 'email'
  // Nunca envie dados sensíveis!
});
```

---

## ✅ Checklist de Segurança

Antes de deploy:

- [ ] Remover console.log
- [ ] Remover credenciais do código
- [ ] Usar HTTPS
- [ ] CORS configurado
- [ ] Token em secure cookies
- [ ] Inputs validados
- [ ] Erros sem dados sensíveis
- [ ] npm audit clean
- [ ] Dependências atualizadas
- [ ] CSP headers configurados
- [ ] Rate limiting backend
- [ ] Logging de segurança
- [ ] Teste de XSS
- [ ] Teste de CSRF
- [ ] 2FA opcional

---

## 🚀 Segurança em Deploy

### Vercel
```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### Nginx
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

---

## 📚 Recursos

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security](https://react.dev/learn)
- [CSP Generator](https://report-uri.com/home/generate)
- [npm audit](https://docs.npmjs.com/cli/v9/commands/npm-audit)

---

**Segurança não é opcional! 🔒**

