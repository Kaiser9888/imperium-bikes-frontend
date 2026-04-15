import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { anunciosAPI } from '../services/api';
import '../styles/createListing.css';

export default function CreateListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(!!id);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    categoria: 'mountain',
    preco: 0,
    marca: '',
    modelo: '',
    ano: new Date().getFullYear(),
    condicao: 'novo',
    imagens: [],
    destaque: 'free', // free, 30dias, definitivo
  });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      carregarAnuncio();
    }
  }, [id]);

  const carregarAnuncio = async () => {
    try {
      const response = await anunciosAPI.obter(id);
      setFormData(response.data);
    } catch (error) {
      console.error('Erro ao carregar anúncio:', error);
      setErro('Erro ao carregar anúncio');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'preco' || name === 'ano' ? parseFloat(value) : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Aqui você deveria fazer upload real das imagens
    // Por enquanto, apenas simulamos com URLs
    const novasImagens = files.map(f => URL.createObjectURL(f));
    setFormData(prev => ({
      ...prev,
      imagens: [...prev.imagens, ...novasImagens]
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      imagens: prev.imagens.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      // Se for um plano pago, redirecionar para checkout
      if (formData.destaque !== 'free' && !isEditing) {
        navigate(`/checkout?tipo=${formData.destaque}&anuncioId=temp`);
        return;
      }

      if (isEditing) {
        await anunciosAPI.atualizar(id, formData);
      } else {
        await anunciosAPI.criar(formData);
      }
      navigate('/meus-anuncios');
    } catch (error) {
      setErro(error.response?.data?.message || 'Erro ao salvar anúncio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-listing">
      <div className="container">
        <h1>{isEditing ? 'Editar Anúncio' : 'Criar Novo Anúncio'}</h1>

        {erro && <div className="error-message">{erro}</div>}

        <form onSubmit={handleSubmit} className="listing-form">
          {/* Informações Básicas */}
          <section className="form-section">
            <h2>Informações Básicas</h2>

            <div className="form-group full-width">
              <label htmlFor="titulo">Título *</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                placeholder="Ex: Mountain Bike 29 Shimano"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="descricao">Descrição *</label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
                placeholder="Descreva o produto em detalhes..."
                rows="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoria">Categoria *</label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              >
                <option value="mountain">Mountain Bike</option>
                <option value="estrada">Bicicleta de Estrada</option>
                <option value="urban">Urban</option>
                <option value="bmx">BMX</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="condicao">Condição *</label>
              <select
                id="condicao"
                name="condicao"
                value={formData.condicao}
                onChange={handleChange}
                required
              >
                <option value="novo">Novo</option>
                <option value="como-novo">Como Novo</option>
                <option value="bom">Bom Estado</option>
                <option value="usado">Usado</option>
              </select>
            </div>
          </section>

          {/* Detalhes Técnicos */}
          <section className="form-section">
            <h2>Detalhes do Produto</h2>

            <div className="form-group">
              <label htmlFor="marca">Marca</label>
              <input
                type="text"
                id="marca"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                placeholder="Ex: Caloi, Monark"
              />
            </div>

            <div className="form-group">
              <label htmlFor="modelo">Modelo</label>
              <input
                type="text"
                id="modelo"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                placeholder="Ex: Elite Pro"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ano">Ano</label>
              <input
                type="number"
                id="ano"
                name="ano"
                value={formData.ano}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="preco">Preço (R$) *</label>
              <input
                type="number"
                id="preco"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>
          </section>

          {/* Imagens */}
          <section className="form-section">
            <h2>Imagens</h2>
            <p className="help-text">Adicione até 10 imagens do produto</p>

            <div className="image-upload">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="images" className="upload-btn">
                📁 Selecionar Imagens
              </label>
            </div>

            {formData.imagens.length > 0 && (
              <div className="image-grid">
                {formData.imagens.map((img, idx) => (
                  <div key={idx} className="image-item">
                    <img src={img} alt={`Preview ${idx}`} />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="remove-btn"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Destaque do Anúncio */}
          <section className="form-section">
            <h2>Destaque do Anúncio</h2>
            <p className="help-text">Escolha um plano para destacar seu anúncio</p>

            <div className="destaque-options">
              <div className={`destaque-option ${formData.destaque === 'free' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  id="free"
                  name="destaque"
                  value="free"
                  checked={formData.destaque === 'free'}
                  onChange={handleChange}
                />
                <label htmlFor="free">
                  <div className="option-header">
                    <h3>Free</h3>
                    <span className="price">R$ 0,00</span>
                  </div>
                  <ul>
                    <li>Posicionamento normal</li>
                    <li>Sem badge de destaque</li>
                    <li>Visibilidade básica</li>
                  </ul>
                </label>
              </div>

              <div className={`destaque-option ${formData.destaque === '30dias' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  id="30dias"
                  name="destaque"
                  value="30dias"
                  checked={formData.destaque === '30dias'}
                  onChange={handleChange}
                />
                <label htmlFor="30dias">
                  <div className="option-header">
                    <h3>30 Dias</h3>
                    <span className="price">R$ 5,00</span>
                  </div>
                  <ul>
                    <li>Badge "Destaque" por 30 dias</li>
                    <li>Posicionamento prioritário</li>
                    <li>Mais visibilidade</li>
                    <li>Relatórios de visualização</li>
                  </ul>
                </label>
              </div>

              <div className={`destaque-option ${formData.destaque === 'definitivo' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  id="definitivo"
                  name="destaque"
                  value="definitivo"
                  checked={formData.destaque === 'definitivo'}
                  onChange={handleChange}
                />
                <label htmlFor="definitivo">
                  <div className="option-header">
                    <h3>Definitivo</h3>
                    <span className="price">R$ 50,00</span>
                  </div>
                  <ul>
                    <li>Badge "Destaque" permanente</li>
                    <li>Posicionamento sempre prioritário</li>
                    <li>Máxima visibilidade</li>
                    <li>Relatórios avançados</li>
                    <li>Suporte prioritário</li>
                  </ul>
                </label>
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Salvando...' : isEditing ? 'Atualizar Anúncio' : 'Criar Anúncio'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/meus-anuncios')}
              className="btn-cancel"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
