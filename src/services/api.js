import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Anúncios
export const anunciosAPI = {
  listar: (params) => api.get('/api/anuncios', { params }),
  obter: (id) => api.get(`/api/anuncios/${id}`),
  criar: (dados) => api.post('/api/anuncios', dados),
  atualizar: (id, dados) => api.put(`/api/anuncios/${id}`, dados),
  deletar: (id) => api.delete(`/api/anuncios/${id}`),
  listarPorUsuario: (userId) => api.get(`/api/anuncios/usuario/${userId}`),
};

// Usuários
export const usuariosAPI = {
  registrar: (dados) => api.post('/api/usuarios/registrar', dados),
  login: (email, senha) => api.post('/api/usuarios/login', { email, senha }),
  obter: (id) => api.get(`/api/usuarios/${id}`),
  atualizar: (id, dados) => api.put(`/api/usuarios/${id}`, dados),
  obterPerfil: () => api.get('/api/usuarios/perfil/me'),
};

// Favoritos
export const favoritosAPI = {
  listar: () => api.get('/api/favoritos'),
  adicionar: (anuncioId) => api.post('/api/favoritos', { anuncioId }),
  remover: (id) => api.delete(`/api/favoritos/${id}`),
};

// Chat
export const chatAPI = {
  listar: () => api.get('/api/chat/conversas'),
  obter: (id) => api.get(`/api/chat/conversas/${id}`),
  criar: (userId) => api.post('/api/chat/conversas', { userId }),
  enviarMensagem: (conversaId, mensagem) =>
    api.post(`/api/chat/conversas/${conversaId}/mensagens`, { mensagem }),
  listarMensagens: (conversaId) =>
    api.get(`/api/chat/conversas/${conversaId}/mensagens`),
};

// Feed de Vídeos
export const videosAPI = {
  listar: (params) => api.get('/api/videos', { params }),
  obter: (id) => api.get(`/api/videos/${id}`),
  criar: (dados) => api.post('/api/videos', dados),
  atualizar: (id, dados) => api.put(`/api/videos/${id}`, dados),
  deletar: (id) => api.delete(`/api/videos/${id}`),
  listarPorUsuario: (userId) => api.get(`/api/videos/usuario/${userId}`),
  curtir: (id) => api.post(`/api/videos/${id}/curtir`),
  descurtir: (id) => api.delete(`/api/videos/${id}/curtir`),
  comentar: (id, comentario) => api.post(`/api/videos/${id}/comentarios`, { comentario }),
  listarComentarios: (id) => api.get(`/api/videos/${id}/comentarios`),
};

// Feed de Discussões/Forum
export const forumAPI = {
  listarTopicos: (params) => api.get('/api/forum/topicos', { params }),
  obterTopico: (id) => api.get(`/api/forum/topicos/${id}`),
  criarTopico: (dados) => api.post('/api/forum/topicos', dados),
  atualizarTopico: (id, dados) => api.put(`/api/forum/topicos/${id}`, dados),
  deletarTopico: (id) => api.delete(`/api/forum/topicos/${id}`),
  listarPorUsuario: (userId) => api.get(`/api/forum/topicos/usuario/${userId}`),
  responder: (topicoId, resposta) => api.post(`/api/forum/topicos/${topicoId}/respostas`, { resposta }),
  listarRespostas: (topicoId) => api.get(`/api/forum/topicos/${topicoId}/respostas`),
  curtirTopico: (id) => api.post(`/api/forum/topicos/${id}/curtir`),
  descurtirTopico: (id) => api.delete(`/api/forum/topicos/${id}/curtir`),
  curtirResposta: (id) => api.post(`/api/forum/respostas/${id}/curtir`),
  descurtirResposta: (id) => api.delete(`/api/forum/respostas/${id}/curtir`),
};

// Posts Sociais
export const postsAPI = {
  listar: (params) => api.get('/api/posts', { params }),
  obter: (id) => api.get(`/api/posts/${id}`),
  criar: (dados) => api.post('/api/posts', dados),
  atualizar: (id, dados) => api.put(`/api/posts/${id}`, dados),
  deletar: (id) => api.delete(`/api/posts/${id}`),
  listarPorUsuario: (userId) => api.get(`/api/posts/usuario/${userId}`),
  curtir: (id) => api.post(`/api/posts/${id}/curtir`),
  descurtir: (id) => api.delete(`/api/posts/${id}/curtir`),
  comentar: (id, comentario) => api.post(`/api/posts/${id}/comentarios`, { comentario }),
  listarComentarios: (id) => api.get(`/api/posts/${id}/comentarios`),
};

export default api;

