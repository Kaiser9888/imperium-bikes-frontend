import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/productCard.css';

export default function ProductCard({ anuncio }) {
  const [loadingImage, setLoadingImage] = useState(true);

  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(anuncio.preco);

  const reputacaoStars = Math.min(5, Math.round((anuncio.usuario?.reputacao || 0) / 20));
  const stars = '⭐'.repeat(reputacaoStars);

  return (
    <article className="product-card">
      <div className="card-badges">
        {anuncio.destacado && <span className="badge-gold">Destaque</span>}
        <span className={`badge-status ${anuncio.ativo ? 'online' : 'offline'}`}>
          {anuncio.ativo ? '● Disponível' : '○ Reservado'}
        </span>
      </div>

      <div className="card-image">
        {loadingImage && <div className="image-skeleton"></div>}
        <img
          src={anuncio.imagens?.[0] || 'https://via.placeholder.com/300x200?text=Sem+Imagem'}
          alt={anuncio.titulo}
          onLoad={() => setLoadingImage(false)}
          style={{ display: loadingImage ? 'none' : 'block' }}
        />
        <div className="card-overlay">
          <Link to={`/anuncio/${anuncio.id}`} className="btn-view">
            Ver Detalhes
          </Link>
        </div>
      </div>

      <div className="card-content">
        <Link to={`/anuncio/${anuncio.id}`}>
          <h3 className="product-title">{anuncio.titulo}</h3>
        </Link>

        <p className="product-description">
          {anuncio.descricao.substring(0, 80)}...
        </p>

        <div className="product-seller">
          <span className="seller-name">{anuncio.usuario?.nome || 'Vendedor'}</span>
          <span className="seller-rating">{stars}</span>
        </div>

        <div className="card-footer">
          <span className="price">{precoFormatado}</span>
          <Link to={`/anuncio/${anuncio.id}`} className="btn-buy">
            Negociar
          </Link>
        </div>
      </div>
    </article>
  );
}
