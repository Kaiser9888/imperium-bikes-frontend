# 📡 Documentação de Integração com Backend

## Configuração da API

### URL Base
```
http://localhost:8080
```

### Headers Padrão
```javascript
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {token}'
}
```

## Endpoints Disponíveis

### Autenticação

#### POST /api/usuarios/login
```javascript
Body: {
  email: string,
  senha: string
}

Response: {
  token: string,
  user: {
    id: number,
    nome: string,
    email: string,
    telefone: string,
    cidade: string,
    estado: string,
    reputacao: number
  }
}
```

#### POST /api/usuarios/registrar
```javascript
Body: {
  nome: string,
  email: string,
  senha: string,
  telefone?: string
}

Response: {
  id: number,
  nome: string,
  email: string
}
```

#### GET /api/usuarios/perfil/me
Retorna dados do usuário autenticado

#### GET /api/usuarios/:id
Retorna dados de um usuário específico

#### PUT /api/usuarios/:id
Atualiza dados do usuário

---

### Anúncios

#### GET /api/anuncios
```javascript
Query params:
  ?categoria=mountain
  ?precoMin=100
  ?precoMax=5000
  ?busca=shimano
  ?pagina=1

Response: [
  {
    id: number,
    titulo: string,
    descricao: string,
    preco: number,
    categoria: string,
    imagens: string[],
    usuarioId: number,
    usuario: {
      nome: string,
      reputacao: number
    },
    destacado: boolean,
    ativo: boolean,
    dataCriacao: ISO8601Date
  }
]
```

#### GET /api/anuncios/:id
Retorna detalhe completo de um anúncio

#### POST /api/anuncios
```javascript
Body: {
  titulo: string,
  descricao: string,
  categoria: string,
  preco: number,
  marca?: string,
  modelo?: string,
  ano?: number,
  condicao: string,
  imagens: string[],
  destaque: 'free' | '30dias' | 'definitivo'  // 🆕 Sistema de destaques
}

Response: {
  id: number,
  destaque: boolean,
  destaqueTipo: string,
  destaqueExpiraEm?: ISO8601Date,
  ...
}
```

#### PUT /api/anuncios/:id
Atualiza um anúncio (apenas do proprietário)

#### DELETE /api/anuncios/:id
Remove um anúncio (apenas do proprietário)

#### GET /api/anuncios/usuario/:userId
Lista anúncios de um usuário específico

---

### Favoritos

#### GET /api/favoritos
Retorna lista de favoritos do usuário

```javascript
Response: [
  {
    id: number,
    anuncioId: number,
    anuncio: { ...anuncio completo }
  }
]
```

#### POST /api/favoritos
```javascript
Body: {
  anuncioId: number
}

Response: {
  id: number,
  anuncioId: number
}
```

#### DELETE /api/favoritos/:id
Remove um favorito

---

### Chat

#### GET /api/chat/conversas
Retorna lista de conversas do usuário

#### GET /api/chat/conversas/:id
Retorna detalhes de uma conversa com histórico

#### POST /api/chat/conversas
```javascript
Body: {
  userId: number
}

Response: {
  id: number,
  usuario: { ...dados do outro usuário }
}
```

#### GET /api/chat/conversas/:id/mensagens
Lista todas as mensagens de uma conversa

#### POST /api/chat/conversas/:id/mensagens
```javascript
Body: {
  mensagem: string
}

Response: {
  id: number,
  conversaId: number,
  remetenteId: number,
  texto: string,
  dataEnvio: ISO8601Date
}
```

---

## Feed de Vídeos

### GET /api/videos
```javascript
Query params:
  ?filtro=recentes|populares|seguindo
  ?pagina=1

Response: [
  {
    id: number,
    titulo: string,
    descricao: string,
    url: string,
    thumbnail: string,
    usuarioId: number,
    usuario: {
      nome: string,
      reputacao: number
    },
    curtidas: number,
    comentarios: number,
    curtiu: boolean,
    dataCriacao: ISO8601Date
  }
]
```

### POST /api/videos
```javascript
Body: {
  titulo: string,
  descricao: string,
  url: string,
  thumbnail?: string
}

Response: { id: number, ... }
```

### POST /api/videos/:id/curtir
Curtir um vídeo

### DELETE /api/videos/:id/curtir
Descurtir um vídeo

### POST /api/videos/:id/comentarios
```javascript
Body: {
  comentario: string
}
```

---

## Feed de Discussões (Fórum)

### GET /api/forum/topicos
```javascript
Query params:
  ?filtro=recentes|populares|nao-respondidos
  ?pagina=1

Response: [
  {
    id: number,
    titulo: string,
    conteudo: string,
    tags: string[],
    usuarioId: number,
    usuario: {
      nome: string,
      reputacao: number
    },
    respostas: number,
    visualizacoes: number,
    curtidas: number,
    curtiu: boolean,
    dataCriacao: ISO8601Date
  }
]
```

### POST /api/forum/topicos
```javascript
Body: {
  titulo: string,
  conteudo: string,
  tags: string[]
}

Response: { id: number, ... }
```

### GET /api/forum/topicos/:id/respostas
Listar respostas de um tópico

### POST /api/forum/topicos/:id/respostas
```javascript
Body: {
  resposta: string
}
```

### POST /api/forum/topicos/:id/curtir
Curtir tópico

### POST /api/forum/respostas/:id/curtir
Curtir resposta

---

## Posts Sociais

### GET /api/posts
```javascript
Query params:
  ?filtro=recentes|populares|seguindo
  ?pagina=1

Response: [
  {
    id: number,
    conteudo: string,
    imagem?: string,
    usuarioId: number,
    usuario: {
      nome: string,
      reputacao: number
    },
    curtidas: number,
    comentarios: number,
    curtiu: boolean,
    dataCriacao: ISO8601Date
  }
]
```

### POST /api/posts
```javascript
Body: {
  conteudo: string,
  imagem?: string
}

Response: { id: number, ... }
```

### POST /api/posts/:id/curtir
Curtir post

### POST /api/posts/:id/comentarios
```javascript
Body: {
  comentario: string
}
```

---

## Sistema de Destaques

### POST /api/anuncios/:id/destacar
```javascript
Body: {
  tipo: '30dias' | 'definitivo',
  pagamentoId: string  // ID do pagamento processado
}

Response: {
  sucesso: true,
  destaqueAtivo: true,
  destaqueTipo: string,
  destaqueExpiraEm?: ISO8601Date
}
```

### GET /api/anuncios/destaques/ativos
Lista anúncios destacados ativos

---

## Sistema de Pagamentos

### POST /api/pagamentos/processar
```javascript
Body: {
  tipo: 'destaque_anuncio',
  plano: '30dias' | 'definitivo',
  anuncioId: number,
  metodoPagamento: 'cartao' | 'pix' | 'boleto',
  dadosPagamento: {
    // Dados específicos do método
  }
}

Response: {
  sucesso: true,
  pagamentoId: string,
  status: 'aprovado' | 'pendente' | 'recusado'
}
```

### GET /api/pagamentos/:id/status
Verificar status do pagamento

---

## Exemplo de Uso em React

### Autenticação

```javascript
import { usuariosAPI } from './services/api';

// Login
const response = await usuariosAPI.login('user@email.com', '123456');
localStorage.setItem('token', response.data.token);
localStorage.setItem('user', JSON.stringify(response.data.user));

// Obter perfil
const perfil = await usuariosAPI.obterPerfil();
```

### Listar Anúncios

```javascript
import { anunciosAPI } from './services/api';

const anuncios = await anunciosAPI.listar({
  categoria: 'mountain',
  precoMin: 100,
  precoMax: 5000
});
```

### Criar Anúncio

```javascript
await anunciosAPI.criar({
  titulo: 'Mountain Bike Caloi',
  descricao: 'Bicicleta em perfeito estado',
  categoria: 'mountain',
  preco: 1200,
  condicao: 'como-novo',
  imagens: ['url1', 'url2']
});
```

### Chat

```javascript
// Listar conversas
const conversas = await chatAPI.listar();

// Enviar mensagem
await chatAPI.enviarMensagem(conversaId, 'Olá, tudo bem?');

// Listar mensagens
const mensagens = await chatAPI.listarMensagens(conversaId);
```

---

## Tratamento de Erros

Todos os erros retornam:

```javascript
{
  status: number,
  data: {
    message: string,
    errors?: {
      campo: string[]
    }
  }
}
```

### Interceptor de Erro

O cliente já trata automaticamente:
- **401**: Redireciona para /login
- Outros erros: Retorna promise rejeitado

---

## Variáveis de Ambiente

```
VITE_API_URL=http://localhost:8080
```

---

## Dicas de Integração

1. **Token**: Sempre armazenado em localStorage
2. **Refresh**: Implemente refresh token se necessário
3. **Loading**: Use estados de loading em requisições
4. **Cache**: Considere cache local para anúncios
5. **Validação**: Valide dados antes de enviar

---

Desenvolvido para Imperium Bikes 🚀

## 📱 Redes Sociais

O footer inclui links para as seguintes redes sociais:

- **Instagram**: [@imperium_bikes](https://instagram.com/imperium_bikes)
- **TikTok**: [@imperiumbikes](https://tiktok.com/@imperiumbikes)
- **YouTube**: [@ImperiumBikes](https://youtube.com/@ImperiumBikes)
- **E-mail**: imperiumbikes@gmail.com

## 🎨 Footer

O footer contém:
- Logo e descrição da empresa
- Links rápidos de navegação
- Links por categoria
- Redes sociais com ícones
- E-mail de contato
- Copyright e links legais
- Design responsivo e acessível
