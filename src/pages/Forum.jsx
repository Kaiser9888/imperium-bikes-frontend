import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { forumAPI } from '../services/api';

export default function Forum() {
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('recentes');

  useEffect(() => {
    carregarTopicos();
  }, [filtro]);

  const carregarTopicos = async () => {
    try {
      setLoading(true);
      const response = await forumAPI.listarTopicos({ filtro });
      setTopicos(response.data);
    } catch (error) {
      console.error('Erro ao carregar tópicos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCurtirTopico = async (topicoId) => {
    try {
      await forumAPI.curtirTopico(topicoId);
      setTopicos(topicos.map(topico =>
        topico.id === topicoId
          ? { ...topico, curtidas: topico.curtidas + 1, curtiu: true }
          : topico
      ));
    } catch (error) {
      console.error('Erro ao curtir tópico:', error);
    }
  };

  return (
    <main style={{ padding: '2rem', backgroundColor: '#f4f0ea', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.2rem', color: '#1c1b17' }}>💬 Fórum de Discussões</h1>
          <Link
            to="/criar-topico"
            style={{
              backgroundColor: '#b09b82',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            ➕ Novo Tópico
          </Link>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {['recentes', 'populares', 'nao-respondidos'].map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              style={{
                padding: '10px 20px',
                border: '1px solid #e2dcd2',
                backgroundColor: filtro === f ? '#b09b82' : 'white',
                color: filtro === f ? 'white' : '#1c1b17',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              {f === 'recentes' ? 'Recentes' :
               f === 'populares' ? 'Populares' :
               'Não Respondidos'}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#7a6a5a' }}>
            Carregando discussões...
          </div>
        ) : topicos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2 style={{ color: '#1c1b17', marginBottom: '1rem' }}>Nenhuma discussão encontrada</h2>
            <p style={{ color: '#7a6a5a', marginBottom: '1rem' }}>Seja o primeiro a iniciar uma conversa!</p>
            <Link
              to="/criar-topico"
              style={{
                backgroundColor: '#b09b82',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Iniciar Primeira Discussão
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {topicos.map(topico => (
              <article key={topico.id} style={{
                backgroundColor: 'white',
                border: '1px solid #e2dcd2',
                borderRadius: '8px',
                padding: '1.5rem',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <Link
                    to={`/topico/${topico.id}`}
                    style={{
                      textDecoration: 'none',
                      color: '#1c1b17',
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      display: 'block'
                    }}
                  >
                    {topico.titulo}
                  </Link>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.9rem',
                    color: '#7a6a5a',
                    marginBottom: '1rem'
                  }}>
                    <span>Por: {topico.usuario?.nome}</span>
                    <span>{new Date(topico.dataCriacao).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <p style={{
                    color: '#1c1b17',
                    lineHeight: '1.6',
                    marginBottom: '1rem'
                  }}>
                    {topico.conteudo?.substring(0, 200)}...
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#7a6a5a' }}>
                    <span>💬 {topico.respostas || 0} respostas</span>
                    <span>👁️ {topico.visualizacoes || 0} visualizações</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button
                      onClick={() => handleCurtirTopico(topico.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '8px 12px',
                        border: '1px solid #e2dcd2',
                        backgroundColor: topico.curtiu ? '#ffebee' : '#f4f0ea',
                        color: topico.curtiu ? '#c62828' : '#1c1b17',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}
                    >
                      {topico.curtiu ? '❤️' : '🤍'} {topico.curtidas || 0}
                    </button>

                    <Link
                      to={`/topico/${topico.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '8px 12px',
                        border: '1px solid #e2dcd2',
                        backgroundColor: '#f4f0ea',
                        color: '#1c1b17',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        textDecoration: 'none'
                      }}
                    >
                      Responder
                    </Link>
                  </div>
                </div>

                {topico.tags && topico.tags.length > 0 && (
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {topico.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: '#f4f0ea',
                          color: '#b09b82',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
