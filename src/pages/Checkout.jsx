import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/checkout.css';

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const tipo = searchParams.get('tipo'); // 30dias ou definitivo
  const anuncioId = searchParams.get('anuncioId');

  const planos = {
    '30dias': {
      nome: 'Destaque 30 Dias',
      preco: 5.00,
      descricao: 'Seu anúncio destacado por 30 dias',
      beneficios: [
        'Badge "Destaque" visível',
        'Posicionamento prioritário nas buscas',
        'Relatório de visualizações',
        'Suporte prioritário'
      ]
    },
    'definitivo': {
      nome: 'Destaque Definitivo',
      preco: 50.00,
      descricao: 'Seu anúncio destacado permanentemente',
      beneficios: [
        'Badge "Destaque" permanente',
        'Posicionamento sempre prioritário',
        'Relatórios avançados',
        'Suporte VIP',
        'Destaque em newsletters'
      ]
    }
  };

  const plano = planos[tipo];

  if (!plano) {
    return (
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Plano não encontrado</h1>
        <button onClick={() => navigate('/meus-anuncios')} style={{
          padding: '10px 20px',
          backgroundColor: '#b09b82',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Voltar
        </button>
      </main>
    );
  }

  const handlePagamento = async (metodo) => {
    setLoading(true);
    setErro('');

    try {
      // Simulação de processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Aqui você integraria com gateway de pagamento real
      // Por enquanto, simulamos sucesso
      const sucesso = Math.random() > 0.1; // 90% de sucesso

      if (sucesso) {
        // Redirecionar para confirmação
        navigate(`/checkout/sucesso?tipo=${tipo}&anuncioId=${anuncioId}`);
      } else {
        setErro('Pagamento não autorizado. Tente novamente.');
      }
    } catch (error) {
      setErro('Erro no processamento do pagamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="checkout-page">
      <div className="container">
        <div className="checkout-grid">
          {/* Resumo do Plano */}
          <div className="checkout-summary">
            <h1>Checkout</h1>

            <div className="plano-card">
              <div className="plano-header">
                <h2>{plano.nome}</h2>
                <div className="preco">
                  R$ {plano.preco.toFixed(2)}
                </div>
              </div>

              <p className="plano-descricao">{plano.descricao}</p>

              <ul className="beneficios-list">
                {plano.beneficios.map((beneficio, idx) => (
                  <li key={idx}>
                    <span className="check-icon">✓</span>
                    {beneficio}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <div className="checkout-form">
            <h2>Forma de Pagamento</h2>

            {erro && <div className="error-message">{erro}</div>}

            <div className="pagamento-options">
              <div className="pagamento-option">
                <input
                  type="radio"
                  id="cartao"
                  name="pagamento"
                  value="cartao"
                  defaultChecked
                />
                <label htmlFor="cartao">
                  <div className="option-content">
                    <div className="option-icon">💳</div>
                    <div>
                      <div className="option-title">Cartão de Crédito</div>
                      <div className="option-desc">Visa, Mastercard, Elo</div>
                    </div>
                  </div>
                </label>
              </div>

              <div className="pagamento-option">
                <input
                  type="radio"
                  id="pix"
                  name="pagamento"
                  value="pix"
                />
                <label htmlFor="pix">
                  <div className="option-content">
                    <div className="option-icon">📱</div>
                    <div>
                      <div className="option-title">PIX</div>
                      <div className="option-desc">Pagamento instantâneo</div>
                    </div>
                  </div>
                </label>
              </div>

              <div className="pagamento-option">
                <input
                  type="radio"
                  id="boleto"
                  name="pagamento"
                  value="boleto"
                />
                <label htmlFor="boleto">
                  <div className="option-content">
                    <div className="option-icon">📄</div>
                    <div>
                      <div className="option-title">Boleto Bancário</div>
                      <div className="option-desc">Vencimento em 3 dias</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Formulário do Cartão (simulado) */}
            <div className="cartao-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Número do Cartão</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nome no Cartão</label>
                  <input
                    type="text"
                    placeholder="JOÃO SILVA"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Validade</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    maxLength="5"
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength="4"
                  />
                </div>
              </div>
            </div>

            <div className="checkout-actions">
              <button
                className="btn-pagar"
                onClick={() => handlePagamento('cartao')}
                disabled={loading}
              >
                {loading ? 'Processando...' : `Pagar R$ ${plano.preco.toFixed(2)}`}
              </button>

              <button
                className="btn-cancelar"
                onClick={() => navigate('/meus-anuncios')}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>

            <div className="seguranca-info">
              <div className="seguranca-icon">🔒</div>
              <div>
                <div className="seguranca-title">Pagamento Seguro</div>
                <div className="seguranca-desc">
                  Seus dados estão protegidos com criptografia SSL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
