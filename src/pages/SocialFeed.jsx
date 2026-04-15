import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI } from '../services/api';

export default function SocialFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('recentes');

  useEffect(() => {
    carregarPosts();
  }, [filtro]);

  const carregarPosts = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.listar({ filtro });
      setPosts(response.data);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCurtir = async (postId) => {
    try {
      await postsAPI.curtir(postId);
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, curtidas: post.curtidas + 1, curtiu: true }
          : post
      ));
    } catch (error) {
      console.error('Erro ao curtir post:', error);
    }
  };

  const handleDescurtir = async (postId) => {
    try {
      await postsAPI.descurtir(postId);
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, curtidas: post.curtidas - 1, curtiu: false }
          : post
      ));
    } catch (error) {
      console.error('Erro ao descurtir post:', error);
    }
  };

  return (
    <main style={{ padding: '2rem', backgroundColor: '#f4f0ea', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.2rem', color: '#1c1b17' }}>🌟 Feed Social</h1>
          <Link
            to="/criar-post"
            style={{
              backgroundColor: '#b09b82',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            ➕ Novo Post
          </Link>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {['recentes', 'populares', 'seguindo'].map(f => (
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
               'Seguindo'}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#7a6a5a' }}>
            Carregando posts...
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2 style={{ color: '#1c1b17', marginBottom: '1rem' }}>Nenhum post encontrado</h2>
            <p style={{ color: '#7a6a5a', marginBottom: '1rem' }}>Seja o primeiro a compartilhar algo!</p>
            <Link
              to="/criar-post"
              style={{
                backgroundColor: '#b09b82',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Criar Primeiro Post
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {posts.map(post => (
              <article key={post.id} style={{
                backgroundColor: 'white',
                border: '1px solid #e2dcd2',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                {/* Header do Post */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#b09b82',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '1.1rem'
                  }}>
                    {post.usuario?.nome?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1c1b17' }}>
                      {post.usuario?.nome}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#7a6a5a' }}>
                      {new Date(post.dataCriacao).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>

                {/* Conteúdo do Post */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{
                    color: '#1c1b17',
                    lineHeight: '1.6',
                    fontSize: '1rem',
                    marginBottom: '1rem'
                  }}>
                    {post.conteudo}
                  </p>

                  {/* Imagem do Post (se existir) */}
                  {post.imagem && (
                    <div style={{
                      marginTop: '1rem',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      maxHeight: '400px'
                    }}>
                      <img
                        src={post.imagem}
                        alt="Post"
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Ações do Post */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: '1px solid #f4f0ea'
                }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button
                      onClick={() => post.curtiu ? handleDescurtir(post.id) : handleCurtir(post.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '8px 16px',
                        border: '1px solid #e2dcd2',
                        backgroundColor: post.curtiu ? '#ffebee' : '#f4f0ea',
                        color: post.curtiu ? '#c62828' : '#1c1b17',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {post.curtiu ? '❤️' : '🤍'} {post.curtidas || 0}
                    </button>

                    <Link
                      to={`/post/${post.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '8px 16px',
                        border: '1px solid #e2dcd2',
                        backgroundColor: '#f4f0ea',
                        color: '#1c1b17',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      💬 {post.comentarios || 0}
                    </Link>
                  </div>

                  <button style={{
                    padding: '8px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#7a6a5a',
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}>
                    ⋯
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
