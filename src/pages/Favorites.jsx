import { useState, useEffect } from 'react';
import { favoritosAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import '../styles/favorites.css';

export default function Favorites() {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    try {
      const response = await favoritosAPI.listar();
      setFavoritos(response.data);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorito = async (id) => {
    try {
      await favoritosAPI.remover(id);
      setFavoritos(favoritos.filter(fav => fav.id !== id));
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  return (
    <main className="favorites">
      <div className="container">
        <h1>Meus Favoritos</h1>

        {loading ? (
          <div className="loading">Carregando...</div>
        ) : favoritos.length === 0 ? (
          <div className="empty-state">
            <p>Você ainda não tem produtos favoritados</p>
          </div>
        ) : (
          <div className="favorites-grid">
            {favoritos.map(fav => (
              <div key={fav.id} className="favorite-item">
                <ProductCard anuncio={fav.anuncio} />
                <button
                  className="btn-remove-fav"
                  onClick={() => handleRemoveFavorito(fav.id)}
                >
                  ❌ Remover de Favoritos
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

