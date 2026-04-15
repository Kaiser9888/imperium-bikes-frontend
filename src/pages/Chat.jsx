import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { chatAPI } from '../services/api';
import '../styles/chat.css';

export default function Chat() {
  const [searchParams] = useSearchParams();
  const [conversas, setConversas] = useState([]);
  const [mensagensAtuais, setMensagensAtuais] = useState([]);
  const [conversaAtual, setConversaAtual] = useState(null);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = searchParams.get('userId');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    carregarConversas();
  }, []);

  useEffect(() => {
    if (userId && !conversaAtual) {
      criarOuAbrirConversa(userId);
    }
  }, [userId]);

  const carregarConversas = async () => {
    try {
      const response = await chatAPI.listar();
      setConversas(response.data);
    } catch (error) {
      console.error('Erro ao carregar conversas:', error);
    } finally {
      setLoading(false);
    }
  };

  const criarOuAbrirConversa = async (uId) => {
    try {
      const conversa = await chatAPI.criar(uId);
      setConversaAtual(conversa.data);
      carregarMensagens(conversa.data.id);
    } catch (error) {
      console.error('Erro ao criar conversa:', error);
    }
  };

  const carregarMensagens = async (conversaId) => {
    try {
      const response = await chatAPI.listarMensagens(conversaId);
      setMensagensAtuais(response.data);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    }
  };

  const abrirConversa = (conversa) => {
    setConversaAtual(conversa);
    carregarMensagens(conversa.id);
  };

  const handleEnviarMensagem = async (e) => {
    e.preventDefault();
    if (!novaMensagem.trim() || !conversaAtual) return;

    try {
      await chatAPI.enviarMensagem(conversaAtual.id, novaMensagem);
      setNovaMensagem('');
      carregarMensagens(conversaAtual.id);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <main className="chat-page">
      <div className="chat-container">
        {/* Lista de Conversas */}
        <aside className="conversas-sidebar">
          <h2>Conversas</h2>
          {loading ? (
            <div className="loading">Carregando...</div>
          ) : conversas.length === 0 ? (
            <p className="empty">Nenhuma conversa</p>
          ) : (
            <ul className="conversas-list">
              {conversas.map(conversa => (
                <li
                  key={conversa.id}
                  className={`conversa-item ${conversaAtual?.id === conversa.id ? 'active' : ''}`}
                  onClick={() => abrirConversa(conversa)}
                >
                  <strong>{conversa.usuario?.nome}</strong>
                  <span className="last-message">
                    {conversa.ultimaMensagem?.substring(0, 30)}...
                  </span>
                  <span className="date">
                    {new Date(conversa.dataMensagem).toLocaleDateString('pt-BR')}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Chat */}
        <section className="chat-area">
          {conversaAtual ? (
            <>
              <div className="chat-header">
                <h3>{conversaAtual.usuario?.nome}</h3>
                <p className="user-info">⭐ {conversaAtual.usuario?.reputacao || 0}% confiável</p>
              </div>

              <div className="mensagens">
                {mensagensAtuais.map(msg => (
                  <div
                    key={msg.id}
                    className={`mensagem ${msg.tipo === 'enviada' ? 'enviada' : 'recebida'}`}
                  >
                    <div className="mensagem-conteudo">{msg.texto}</div>
                    <span className="mensagem-hora">
                      {new Date(msg.dataEnvio).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleEnviarMensagem} className="chat-form">
                <input
                  type="text"
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="input-mensagem"
                />
                <button type="submit" className="btn-enviar">
                  Enviar
                </button>
              </form>
            </>
          ) : (
            <div className="empty-chat">
              <p>Selecione uma conversa ou comece uma nova</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

