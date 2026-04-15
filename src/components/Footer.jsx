import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo e Descrição */}
          <div className="footer-section">
            <div className="footer-logo">
              <h3>IMPERIUM</h3>
              <p>O marketplace premium para ciclistas apaixonados.</p>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul>
              <li><a href="/anuncios">Catálogo</a></li>
              <li><a href="/videos">Vídeos</a></li>
              <li><a href="/forum">Fórum</a></li>
              <li><a href="/social-feed">Social</a></li>
              <li><a href="/sobre">Sobre Nós</a></li>
              <li><a href="/contato">Contato</a></li>
            </ul>
          </div>

          {/* Categorias */}
          <div className="footer-section">
            <h4>Categorias</h4>
            <ul>
              <li><a href="/anuncios?categoria=mountain">Mountain Bike</a></li>
              <li><a href="/anuncios?categoria=estrada">Bicicleta de Estrada</a></li>
              <li><a href="/anuncios?categoria=urban">Urban</a></li>
              <li><a href="/anuncios?categoria=bmx">BMX</a></li>
              <li><a href="/anuncios?categoria=acessorios">Acessórios</a></li>
            </ul>
          </div>

          {/* Redes Sociais e Contato */}
          <div className="footer-section">
            <h4>Conecte-se Conosco</h4>

            {/* Redes Sociais */}
            <div className="social-links">
              <a
                href="https://instagram.com/imperium_bikes"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
                aria-label="Instagram"
              >
                📷 Instagram: @imperium_bikes
              </a>

              <a
                href="https://tiktok.com/@imperiumbikes"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link tiktok"
                aria-label="TikTok"
              >
                🎵 TikTok: @imperiumbikes
              </a>

              <a
                href="https://youtube.com/@ImperiumBikes"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link youtube"
                aria-label="YouTube"
              >
                📺 YouTube: @ImperiumBikes
              </a>
            </div>

            {/* Email de Contato */}
            <div className="contact-info">
              <h5>E-mail para Contato</h5>
              <a
                href="mailto:imperiumbikes@gmail.com"
                className="email-link"
              >
                📧 imperiumbikes@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="footer-divider"></div>

        {/* Copyright */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; 2024 Imperium Bikes. Todos os direitos reservados.</p>
          </div>

          <div className="footer-links">
            <a href="/privacidade">Política de Privacidade</a>
            <a href="/termos">Termos de Uso</a>
            <a href="/cookies">Política de Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
