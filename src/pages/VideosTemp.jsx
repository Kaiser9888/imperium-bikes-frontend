import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { videosAPI } from '../services/api';
import '../styles/videos.css';

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('recentes');

  useEffect(() => {
    carregarVideos();
  }, [filtro]);

  const carregarVideos = async () => {
    try {
      setLoading(true);
      const response = await videosAPI.listar({ filtro });
      setVideos(response.data);
    } catch (error) {
      console.error('Erro ao carregar vídeos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCurtir = async (videoId) => {
    try {
      await videosAPI.curtir(videoId);
      // Atualizar estado local
      setVideos(videos.map(video =>
        video.id === videoId
          ? { ...video, curtidas: video.curtidas + 1, curtiu: true }
          : video
      ));
    } catch (error) {
      console.error('Erro ao curtir vídeo:', error);
    }
  };

  const handleDescurtir = async (videoId) => {
    try {
      await videosAPI.descurtir(videoId);
      // Atualizar estado local
      setVideos(videos.map(video =>
        video.id === videoId
          ? { ...video, curtidas: video.curtidas - 1, curtiu: false }
          : video
      ));
    } catch (error) {
      console.error('Erro ao descurtir vídeo:', error);
    }
  };

  return (
    <main className="videos-page">
      <div className="container">
        <div className="videos-header">
          <h1>🎥 Feed de Vídeos</h1>
          <Link to="/criar-video" className="btn-primary">
            ➕ Compartilhar Vídeo
          </Link>
        </div>

        {/* Filtros */}
        <div className="videos-filters">
          <button
            className={`filter-btn ${filtro === 'recentes' ? 'active' : ''}`}
            onClick={() => setFiltro('recentes')}
          >
            Recentes
          </button>
          <button
            className={`filter-btn ${filtro === 'populares' ? 'active' : ''}`}
            onClick={() => setFiltro('populares')}
          >
            Populares
          </button>
          <button
            className={`filter-btn ${filtro === 'seguindo' ? 'active' : ''}`}
            onClick={() => setFiltro('seguindo')}
          >
            Seguindo
          </button>
        </div>

        {/* Grid de Vídeos */}
        {loading ? (
          <div className="loading">Carregando vídeos...</div>
        ) : videos.length === 0 ? (
          <div className="empty-state">
            <h2>Nenhum vídeo encontrado</h2>
            <p>Seja o primeiro a compartilhar um vídeo!</p>
            <Link to="/criar-video" className="btn-primary">
              Compartilhar Primeiro Vídeo
            </Link>
          </div>
        ) : (
          <div className="videos-grid">
            {videos.map(video => (
              <div key={video.id} className="video-card">
                <div className="video-player">
                  <video
                    controls
                    poster={video.thumbnail}
                    className="video-element"
                  >
                    <source src={video.url} type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>
                </div>

                <div className="video-info">
                  <Link to={`/video/${video.id}`}>
                    <h3 className="video-title">{video.titulo}</h3>
                  </Link>

                  <p className="video-description">
                    {video.descricao.substring(0, 100)}...
                  </p>

                  <div className="video-meta">
                    <span className="video-author">
                      Por: {video.usuario?.nome}
                    </span>
                    <span className="video-date">
                      {new Date(video.dataCriacao).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <div className="video-actions">
                    <button
                      className={`btn-like ${video.curtiu ? 'liked' : ''}`}
                      onClick={() => video.curtiu ? handleDescurtir(video.id) : handleCurtir(video.id)}
                    >
                      {video.curtiu ? '❤️' : '🤍'} {video.curtidas || 0}
                    </button>

                    <Link to={`/video/${video.id}`} className="btn-comment">
                      💬 {video.comentarios || 0}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
