import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { anunciosAPI } from '../services/api';
import '../styles/productCard.css';

export default function ProductCard({ anuncio, onDelete }) {
  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(anuncio.preco);

  const reputacaoStars = Math.min(5, Math.round(anuncio.usuario?.reputacao / 20));
  const stars = '⭐'.repeat(reputacaoStars);

  return (
    <article className="product-card">
      {anuncio.destacado && <span className="badge">Destaque</span>}

      <div className="card-image">
        <img
          src={anuncio.imagens?.[0] || 'https://via.placeholder.com/300x200?text=Sem+Imagem'}
          alt={anuncio.titulo}
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
          <span className="seller-name">{anuncio.usuario?.nome}</span>
          <span className="seller-rating">{stars}</span>
        </div>

        <div className="card-footer">
          <span className="price">{precoFormatado}</span>
          <Link
            to={`/anuncio/${anuncio.id}`}
            className="btn-secondary"
          >
            Comprar
          </Link>
        </div>
      </div>
    </article>
  );
}

