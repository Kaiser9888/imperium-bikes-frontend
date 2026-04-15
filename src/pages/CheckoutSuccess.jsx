import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import '../styles/checkoutSuccess.css';

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const tipo = searchParams.get('tipo');
  const anuncioId = searchParams.get('anuncioId');

  const mensagens = {
    '30dias': {
      titulo: 'Destaque Ativado! 🎉',
      mensagem: 'Seu anúncio está destacado por 30 dias',
      descricao: 'Agora seu anúncio tem prioridade máxima nas buscas e exibe o badge "Destaque".'
    },
    'definitivo': {
      titulo: 'Destaque Permanente Ativado! 🏆',
      mensagem: 'Seu anúncio está destacado permanentemente',
      descricao: 'Agora seu anúncio sempre terá prioridade máxima e destaque VIP.'
    }
  };

  const msg = mensagens[tipo];

  useEffect(() => {
    // Aqui você poderia atualizar o status do anúncio no backend
    // Por enquanto, apenas simulamos
    console.log(`Anúncio ${anuncioId} destacado com plano ${tipo}`);
  }, [tipo, anuncioId]);

  if (!msg) {
    return (
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Página não encontrada</h1>
        <Link to="/meus-anuncios">Voltar aos meus anúncios</Link>
      </main>
    );
  }

  return (
    <main className="checkout-success">
      <div className="container">
        <div className="success-card">
          <div className="success-icon">✅</div>

          <h1>{msg.titulo}</h1>

          <div className="success-message">
            <h2>{msg.mensagem}</h2>
            <p>{msg.descricao}</p>
          </div>

          <div className="success-details">
            <div className="detail-item">
              <span className="detail-label">Anúncio ID:</span>
              <span className="detail-value">#{anuncioId}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Plano:</span>
              <span className="detail-value">
                {tipo === '30dias' ? 'Destaque 30 Dias' : 'Destaque Definitivo'}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span className="detail-value status-active">Ativo</span>
            </div>
          </div>

          <div className="success-benefits">
            <h3>Seus benefícios:</h3>
            <ul>
              <li>🏷️ Badge "Destaque" visível</li>
              <li>📈 Posicionamento prioritário</li>
              <li>👁️ Mais visualizações</li>
              <li>📊 Relatórios de desempenho</li>
              {tipo === 'definitivo' && (
                <>
                  <li>⭐ Suporte VIP</li>
                  <li>📧 Destaque em newsletters</li>
                </>
              )}
            </ul>
          </div>

          <div className="success-actions">
            <Link to={`/anuncio/${anuncioId}`} className="btn-primary">
              Ver Meu Anúncio
            </Link>
            <Link to="/meus-anuncios" className="btn-secondary">
              Meus Anúncios
            </Link>
          </div>

          <div className="success-note">
            <p>
              💡 <strong>Dica:</strong> Monitore o desempenho do seu anúncio
              na seção "Meus Anúncios" para ver quantas visualizações extras você ganhou!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
