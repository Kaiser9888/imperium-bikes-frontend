import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { anunciosAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import '../styles/myListings.css';

export default function MyListings() {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    carregarAnuncios();
  }, []);

  const carregarAnuncios = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/login');
        return;
      }

      const response = await anunciosAPI.listarPorUsuario(user.id);
      setAnuncios(response.data);
    } catch (error) {
      console.error('Erro ao carregar anúncios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja deletar este anúncio?')) {
      try {
        await anunciosAPI.deletar(id);
        setAnuncios(anuncios.filter(a => a.id !== id));
      } catch (error) {
        console.error('Erro ao deletar anúncio:', error);
      }
    }
  };

  return (
    <main className="my-listings">
      <div className="container">
        <div className="listings-header">
          <h1>Meus Anúncios</h1>
          <Link to="/criar-anuncio" className="btn-primary">
            ➕ Novo Anúncio
          </Link>
        </div>

        {loading ? (
          <div className="loading">Carregando...</div>
        ) : anuncios.length === 0 ? (
          <div className="empty-state">
            <h2>Você ainda não tem anúncios</h2>
            <p>Comece a vender agora mesmo!</p>
            <Link to="/criar-anuncio" className="btn-primary">
              Criar Meu Primeiro Anúncio
            </Link>
          </div>
        ) : (
          <div className="listings-table">
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Preço</th>
                  <th>Status</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {anuncios.map(anuncio => (
                  <tr key={anuncio.id}>
                    <td>{anuncio.titulo}</td>
                    <td>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(anuncio.preco)}
                    </td>
                    <td>
                      <span className={`status status-${anuncio.ativo ? 'active' : 'inactive'}`}>
                        {anuncio.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      {new Date(anuncio.dataCriacao).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="actions">
                      <Link to={`/anuncio/${anuncio.id}`} className="btn-small">
                        Ver
                      </Link>
                      <Link to={`/editar-anuncio/${anuncio.id}`} className="btn-small">
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(anuncio.id)}
                        className="btn-small btn-danger"
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

