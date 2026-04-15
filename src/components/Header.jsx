import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          IMPERIUM
        </Link>

        <nav className="header-nav">
          <Link to="/anuncios">Catálogo</Link>
          <Link to="/videos">Vídeos</Link>
          <Link to="/forum">Fórum</Link>
          <Link to="/social-feed">Social</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/contato">Contato</Link>
        </nav>

        <div className="header-actions">
          {isLoggedIn ? (
            <>
              <Link to="/favoritos" className="icon-btn">
                ♡
              </Link>
              <Link to="/chat" className="icon-btn">
                💬
              </Link>
              <div className="user-menu">
                <button className="user-btn">
                  {user?.nome || 'Usuário'}
                </button>
                <div className="dropdown">
                  <Link to="/perfil">Meu Perfil</Link>
                  <Link to="/meus-anuncios">Meus Anúncios</Link>
                  <button onClick={handleLogout}>Sair</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline">
                Entrar
              </Link>
              <Link to="/registrar" className="btn-primary">
                Registrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
