import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Livros
export const livroService = {
  async getLivros() {
    try {
      const res = await api.get('/livros');
      return res.data.data || [];
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao listar livros';
    }
  },

  async getLivroById(id) {
    try {
      const res = await api.get(`/livros/${id}`);
      return res.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao obter livro';
    }
  },

  async criar(livro) {
    try {
      const res = await api.post('/livros', livro);
      return res.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao criar livro';
    }
  },

  async atualizar(id, livro) {
    try {
      const res = await api.put(`/livros/${id}`, livro);
      return res.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao atualizar livro';
    }
  },

  async deletar(id) {
    try {
      await api.delete(`/livros/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao deletar livro';
    }
  },
};

export default livroService;
