# 🎣 Hooks Customizados - Exemplos de Uso

## useFetch

Simplifica requisições à API com loading e erro.

### Exemplo
```jsx
import { useFetch } from '../hooks';
import { anunciosAPI } from '../services/api';

export default function Home() {
  const { data: anuncios, loading, erro, executar } = useFetch(
    anunciosAPI.listar
  );

  useEffect(() => {
    executar({ categoria: 'mountain' });
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (erro) return <div>Erro: {erro}</div>;

  return (
    <div>
      {anuncios?.map(a => <ProductCard key={a.id} anuncio={a} />)}
    </div>
  );
}
```

---

## useAuth

Gerencia autenticação do usuário.

### Exemplo
```jsx
import { useAuth } from '../hooks';

export default function Header() {
  const { user, isLogged, login, logout } = useAuth();

  const handleLogin = async (email, senha) => {
    const response = await usuariosAPI.login(email, senha);
    login(response.data.user, response.data.token);
  };

  return (
    <header>
      {isLogged ? (
        <>
          <span>Olá, {user.nome}</span>
          <button onClick={logout}>Sair</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
}
```

---

## useForm

Simplifica gerenciamento de formulários.

### Exemplo
```jsx
import { useForm } from '../hooks';

export default function CreateListing() {
  const { formData, handleChange, reset } = useForm({
    titulo: '',
    preco: 0,
    descricao: '',
    categoria: 'mountain'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await anunciosAPI.criar(formData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="titulo"
        value={formData.titulo}
        onChange={handleChange}
      />
      <input
        name="preco"
        type="number"
        value={formData.preco}
        onChange={handleChange}
      />
      <button type="submit">Criar</button>
    </form>
  );
}
```

---

## usePagination

Gerencia paginação de listas.

### Exemplo
```jsx
import { usePagination } from '../hooks';

export default function ListPage() {
  const [anuncios, setAnuncios] = useState([]);
  const { paginatedItems, currentPage, setCurrentPage, totalPages } = 
    usePagination(anuncios, 10);

  return (
    <>
      <div className="products-grid">
        {paginatedItems.map(a => <ProductCard key={a.id} anuncio={a} />)}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}
```

---

## useDebounce

Debounce para buscas e inputs.

### Exemplo
```jsx
import { useDebounce } from '../hooks';

export default function SearchPage() {
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const debouncedBusca = useDebounce(busca, 300);

  useEffect(() => {
    if (debouncedBusca) {
      anunciosAPI.listar({ busca: debouncedBusca })
        .then(r => setResultados(r.data));
    }
  }, [debouncedBusca]);

  return (
    <>
      <input
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Procure uma bicicleta..."
      />
      <div>
        {resultados.map(a => <ProductCard key={a.id} anuncio={a} />)}
      </div>
    </>
  );
}
```

---

## useLocalStorage

Persistência em localStorage.

### Exemplo
```jsx
import { useLocalStorage } from '../hooks';

export default function UserPreferences() {
  const [tema, setTema] = useLocalStorage('tema', 'claro');
  const [idioma, setIdioma] = useLocalStorage('idioma', 'pt-BR');

  return (
    <div>
      <select value={tema} onChange={(e) => setTema(e.target.value)}>
        <option value="claro">Claro</option>
        <option value="escuro">Escuro</option>
      </select>

      <select value={idioma} onChange={(e) => setIdioma(e.target.value)}>
        <option value="pt-BR">Português</option>
        <option value="en-US">English</option>
      </select>
    </div>
  );
}
```

---

## Combinando Hooks

### Exemplo Completo
```jsx
import { useFetch, useForm, useDebounce } from '../hooks';

export default function Advanced() {
  const { formData, handleChange, reset } = useForm({
    busca: '',
    categoria: '',
    preco: 5000
  });

  const debouncedBusca = useDebounce(formData.busca, 500);

  const { data, loading, erro, executar } = useFetch(
    anunciosAPI.listar
  );

  useEffect(() => {
    executar({
      busca: debouncedBusca,
      categoria: formData.categoria,
      precoMax: formData.preco
    });
  }, [debouncedBusca, formData.categoria, formData.preco]);

  return (
    <>
      <input
        name="busca"
        value={formData.busca}
        onChange={handleChange}
        placeholder="Buscar..."
      />
      
      {loading ? (
        <div>Carregando...</div>
      ) : erro ? (
        <div>Erro: {erro}</div>
      ) : (
        <div>
          {data?.map(a => <ProductCard key={a.id} anuncio={a} />)}
        </div>
      )}
    </>
  );
}
```

---

## Criando Novos Hooks

Template para criar um novo hook:

```jsx
/**
 * useNovoHook
 * Descrição do que o hook faz
 * @param {type} param - Descrição
 * @returns {type} Descrição do retorno
 */
export function useNovoHook(param) {
  // Lógica aqui
  
  return { /* valores a retornar */ };
}
```

---

**Dica:** Hooks tornam o código mais reutilizável e legível! 🎣

