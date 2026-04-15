import React, { useState, useCallback } from 'react';

/**
 * Hook customizado para requisições com loading e erro
 * @param {Function} apiCall - Função que faz a chamada à API
 * @returns {Object} { data, loading, erro, executar }
 */
export function useFetch(apiCall) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const executar = useCallback(async (...args) => {
    setLoading(true);
    setErro('');

    try {
      const response = await apiCall(...args);
      setData(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Erro na requisição';
      setErro(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  return { data, loading, erro, executar };
}

/**
 * Hook para autenticação
 * @returns {Object} { user, isLogged, loading, login, logout }
 */
export function useAuth() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = useCallback((userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const isLogged = !!user;

  return { user, isLogged, loading, login, logout };
}

/**
 * Hook para gerenciar formulários
 * @param {Object} initialState - Estado inicial
 * @returns {Object} { formData, setFormData, handleChange, reset }
 */
export function useForm(initialState) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const reset = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  return { formData, setFormData, handleChange, reset };
}

/**
 * Hook para paginação
 * @param {number} itemsPerPage - Itens por página
 * @returns {Object} { currentPage, setCurrentPage, paginatedItems, totalPages }
 */
export function usePagination(items = [], itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    currentPage,
    setCurrentPage,
    paginatedItems,
    totalPages
  };
}

/**
 * Hook para debounce
 * @param {any} value - Valor para debounce
 * @param {number} delay - Delay em ms
 * @returns {any} Valor com debounce
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook para localStorage
 * @param {string} key - Chave
 * @param {any} initialValue - Valor inicial
 * @returns {Array} [value, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [storedValue]);

  return [storedValue, setValue];
}

export default {
  useFetch,
  useAuth,
  useForm,
  usePagination,
  useDebounce,
  useLocalStorage
};


