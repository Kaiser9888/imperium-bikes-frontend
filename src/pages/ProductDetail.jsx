import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { anunciosAPI, favoritosAPI } from '../services/api';
import '../styles/productDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anuncio, setAnuncio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorito, setIsFavorito] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState(0);

  useEffect(() => {
    carregarAnuncio();
    verificarFavorito();
  }, [id]);

  const carregarAnuncio = async () => {
    try {
      const response = await anunciosAPI.obter(id);
      setAnuncio(response.data);
    } catch (error) {
      console.error('Erro ao carregar anúncio:', error);
    } finally {
      setLoading(false);
    }
  };

  const verificarFavorito = async () => {
    try {
      const favoritos = await favoritosAPI.listar();
      const existe = favoritos.data.some(fav => fav.anuncioId === parseInt(id));
      setIsFavorito(existe);
    } catch (error) {
      console.error('Erro ao verificar favorito:', error);
    }
  };

  const handleToggleFavorito = async () => {
    try {
      if (isFavorito) {
        // Remover de favoritos
        const favoritos = await favoritosAPI.listar();
        const fav = favoritos.data.find(f => f.anuncioId === parseInt(id));
        if (fav) {
          await favoritosAPI.remover(fav.id);
        }
      } else {
        // Adicionar a favoritos
        await favoritosAPI.adicionar(parseInt(id));
      }
      setIsFavorito(!isFavorito);
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    }
  };

  const handleConversarComVendedor = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    navigate(`/chat?userId=${anuncio.usuarioId}`);
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (!anuncio) return <div className="error">Anúncio não encontrado</div>;

  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(anuncio.preco);

  return (
    <main className="product-detail">
      <div className="container">
        <div className="detail-grid">
          {/* Galeria de Imagens */}
          <div className="detail-images">
            <div className="main-image">
              <img
                src={anuncio.imagens?.[imagemSelecionada] || 'https://via.placeholder.com/500x500?text=Sem+Imagem'}
                alt={anuncio.titulo}
              />
              {anuncio.destacado && <span className="badge-large">Destaque</span>}
            </div>

            {anuncio.imagens && anuncio.imagens.length > 1 && (
              <div className="thumbnails">
                {anuncio.imagens.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumbnail ${idx === imagemSelecionada ? 'active' : ''}`}
                    onClick={() => setImagemSelecionada(idx)}
                  >
                    <img src={img} alt={`View ${idx}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informações do Anúncio */}
          <div className="detail-info">
            <h1>{anuncio.titulo}</h1>

            {/* Vendedor */}
            <div className="seller-info">
              <div>
                <p className="seller-name">{anuncio.usuario?.nome}</p>
                <p className="seller-rating">
                  ⭐ {anuncio.usuario?.reputacao || 0}% de reputação
                </p>
              </div>
            </div>

            {/* Preço */}
            <div className="price-section">
              <span className="price-label">Preço</span>
              <span className="price-value">{precoFormatado}</span>
            </div>

            {/* Descrição */}
            <div className="description-section">
              <h3>Descrição</h3>
              <p>{anuncio.descricao}</p>
            </div>

            {/* Detalhes */}
            <div className="details-section">
              <h3>Detalhes do Produto</h3>
              <dl>
                <dt>Categoria</dt>
                <dd>{anuncio.categoria}</dd>
                <dt>Localização</dt>
                <dd>{anuncio.usuario?.cidade}, {anuncio.usuario?.estado}</dd>
                <dt>Publicado</dt>
                <dd>{new Date(anuncio.dataCriacao).toLocaleDateString('pt-BR')}</dd>
              </dl>
            </div>

            {/* Ações */}
            <div className="actions">
              <button
                className="btn-conversar"
                onClick={handleConversarComVendedor}
              >
                💬 Conversar com Vendedor
              </button>
              <button
                className={`btn-favorito ${isFavorito ? 'active' : ''}`}
                onClick={handleToggleFavorito}
              >
                {isFavorito ? '❤️' : '♡'} Favorito
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

