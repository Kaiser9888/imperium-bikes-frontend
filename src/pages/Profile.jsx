import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuariosAPI } from '../services/api';
import '../styles/profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await usuariosAPI.obterPerfil();
      setUser(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await usuariosAPI.atualizar(user.id, formData);
      setUser(formData);
      setIsEditing(false);
      localStorage.setItem('user', JSON.stringify(formData));
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (!user) return <div className="error">Não foi possível carregar o perfil</div>;

  return (
    <main className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>Meu Perfil</h1>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="btn-edit">
              ✎ Editar
            </button>
          )}
        </div>

        <div className="profile-content">
          {isEditing ? (
            // Modo Edição
            <div className="profile-form">
              <div className="form-group">
                <label htmlFor="nome">Nome Completo</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefone">Telefone</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cidade">Cidade</label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  value={formData.cidade || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  value={formData.estado || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="form-actions">
                <button onClick={handleSave} className="btn-save">
                  Salvar
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(user);
                  }}
                  className="btn-cancel"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            // Modo Visualização
            <div className="profile-info">
              <div className="info-grid">
                <div className="info-card">
                  <h3>Informações Pessoais</h3>
                  <dl>
                    <dt>Nome</dt>
                    <dd>{user.nome}</dd>
                    <dt>Email</dt>
                    <dd>{user.email}</dd>
                    <dt>Telefone</dt>
                    <dd>{user.telefone || 'Não informado'}</dd>
                    <dt>Cidade</dt>
                    <dd>{user.cidade || 'Não informado'}</dd>
                    <dt>Estado</dt>
                    <dd>{user.estado || 'Não informado'}</dd>
                  </dl>
                </div>

                <div className="info-card">
                  <h3>Reputação</h3>
                  <div className="reputation">
                    <span className="reputation-score">{user.reputacao || 0}%</span>
                    <p className="reputation-desc">
                      {user.reputacao >= 90 ? 'Vendedor confiável' :
                       user.reputacao >= 70 ? 'Bom vendedor' :
                       user.reputacao >= 50 ? 'Vendedor novo' :
                       'Reputação baixa'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

