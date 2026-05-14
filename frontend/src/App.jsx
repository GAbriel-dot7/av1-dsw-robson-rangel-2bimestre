import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LivroForm } from './components/LivroForm';
import { LivroList } from './components/LivroList';
import { livroService } from './services/livroService';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [livroEmEdicao, setLivroEmEdicao] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    carregarLivros();
  }, []);

  const carregarLivros = async () => {
    setLoading(true);
    try {
      const data = await livroService.getLivros();
      setLivros(data);
      setError('');
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    await carregarLivros();
    setPage('home');
    setLivroEmEdicao(null);
  };

  const handleEdit = (livro) => {
    setLivroEmEdicao(livro);
    setPage('edit');
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja deletar este livro?')) {
      try {
        await livroService.deletar(id);
        await carregarLivros();
        alert('✅ Livro deletado com sucesso!');
      } catch (err) {
        alert(`❌ Erro: ${err}`);
      }
    }
  };

  const filteredLivros = livros.filter(
    (livro) =>
      livro.titulo.toLowerCase().includes(search.toLowerCase()) ||
      livro.autor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        onHome={() => {
          setPage('home');
          setLivroEmEdicao(null);
          setSearch('');
        }}
        onCreate={() => {
          setLivroEmEdicao(null);
          setPage('create');
        }}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">❌ Erro</p>
            <p>{error}</p>
          </div>
        )}

        {page === 'home' && (
          <>
            <div className="mb-8">
              <input
                type="text"
                placeholder="🔍 Buscar por título ou autor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {search ? `📚 Resultados (${filteredLivros.length})` : `📖 Biblioteca (${livros.length})`}
              </h2>
              <button
                onClick={carregarLivros}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600"
              >
                🔄 Atualizar
              </button>
            </div>
            <LivroList
              livros={filteredLivros}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          </>
        )}

        {page === 'create' && (
          <LivroForm
            onSave={handleSave}
            onCancel={() => setPage('home')}
          />
        )}

        {page === 'edit' && livroEmEdicao && (
          <LivroForm
            livro={livroEmEdicao}
            onSave={handleSave}
            onCancel={() => {
              setPage('home');
              setLivroEmEdicao(null);
            }}
          />
        )}
      </main>
    </div>
  );
}

export default App;
