import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuariosAPI } from '../services/api';
import '../styles/auth.css';

export default function Registrar() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmaSenha: '',
    telefone: '',
  });
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (formData.senha !== formData.confirmaSenha) {
      setErro('As senhas não conferem');
      return;
    }

    setCarregando(true);

    try {
      await usuariosAPI.registrar({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        telefone: formData.telefone,
      });

      navigate('/login');
    } catch (err) {
      setErro(err.response?.data?.message || 'Erro ao registrar');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-box">
        <h1>Registrar</h1>
        <p className="auth-subtitle">Crie sua conta Imperium</p>

        {erro && <div className="error-message">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Seu nome"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmaSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmaSenha"
              name="confirmaSenha"
              value={formData.confirmaSenha}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={carregando}
          >
            {carregando ? 'Registrando...' : 'Registrar'}
          </button>
        </form>

        <p className="auth-footer">
          Já tem conta? <a href="/login">Faça login aqui</a>
        </p>
      </div>
    </main>
  );
}

