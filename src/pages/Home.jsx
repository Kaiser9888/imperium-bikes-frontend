import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { anunciosAPI } from '../services/api';
import '../styles/home.css';

export default function Home() {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    categoria: '',
    precoMin: 0,
    precoMax: 1000000,
    busca: '',
  });

  useEffect(() => {
    carregarAnuncios();
  }, [filtros]);

  const carregarAnuncios = async () => {
    try {
      setLoading(true);
      const response = await anunciosAPI.listar(filtros);
      setAnuncios(response.data);
    } catch (error) {
      console.error('Erro ao carregar anúncios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Imperium Bikes</h1>
          <p>Marketplace Premium de Bicicletas e Acessórios</p>
          <a href="#catalogo" className="btn-hero">
            Explorar Catálogo
          </a>
        </div>
      </section>

      {/* Filtros */}
      <section className="filters-section">
        <div className="container">
          <h2>Encontre Sua Bicicleta Perfeita</h2>

          <div className="filters-grid">
            <div className="filter-group">
              <label htmlFor="busca">Buscar</label>
              <input
                type="text"
                id="busca"
                name="busca"
                placeholder="Marca, modelo..."
                value={filtros.busca}
                onChange={handleFiltroChange}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="categoria">Categoria</label>
              <select
                id="categoria"
                name="categoria"
                value={filtros.categoria}
                onChange={handleFiltroChange}
              >
                <option value="">Todas</option>
                <option value="mountain">Mountain Bike</option>
                <option value="estrada">Bicicleta de Estrada</option>
                <option value="urban">Urban</option>
                <option value="bmx">BMX</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="precoMin">Preço Mín.</label>
              <input
                type="number"
                id="precoMin"
                name="precoMin"
                value={filtros.precoMin}
                onChange={handleFiltroChange}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="precoMax">Preço Máx.</label>
              <input
                type="number"
                id="precoMax"
                name="precoMax"
                value={filtros.precoMax}
                onChange={handleFiltroChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section className="catalogo" id="catalogo">
        <div className="container">
          {loading ? (
            <div className="loading">Carregando...</div>
          ) : anuncios.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum anúncio encontrado</p>
            </div>
          ) : (
            <div className="products-grid">
              {anuncios.map(anuncio => (
                <ProductCard
                  key={anuncio.id}
                  anuncio={anuncio}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

