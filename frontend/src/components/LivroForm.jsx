import { useState } from 'react';
import { livroService } from '../services/livroService';

export function LivroForm({ onSave, livro = null, onCancel }) {
  const [formData, setFormData] = useState(livro || {
    titulo: '',
    autor: '',
    isbn: '',
    anoPublicacao: new Date().getFullYear(),
    genero: '',
    descricao: '',
    quantidadeDisponivel: 1,
    preco: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'anoPublicacao' || name === 'quantidadeDisponivel' 
        ? parseInt(value) 
        : name === 'preco' 
        ? parseFloat(value) 
        : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (livro?.id) {
        await livroService.atualizar(livro.id, formData);
      } else {
        await livroService.criar(formData);
      }
      onSave();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {livro?.id ? '✏️ Editar Livro' : '➕ Novo Livro'}
      </h2>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="titulo"
          placeholder="Título *"
          value={formData.titulo}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="autor"
          placeholder="Autor *"
          value={formData.autor}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="isbn"
          placeholder="ISBN *"
          value={formData.isbn}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="anoPublicacao"
          placeholder="Ano Publicação *"
          value={formData.anoPublicacao}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="genero"
          placeholder="Gênero *"
          value={formData.genero}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="preco"
          placeholder="Preço *"
          value={formData.preco}
          onChange={handleChange}
          step="0.01"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <input
          type="number"
          name="quantidadeDisponivel"
          placeholder="Quantidade Disponível"
          value={formData.quantidadeDisponivel}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={formData.descricao}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : livro?.id ? '✏️ Atualizar' : '➕ Criar'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg font-bold hover:bg-gray-600"
          >
            ❌ Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
