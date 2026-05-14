import { LivroCard } from './LivroCard';

export function LivroList({ livros, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando livros...</p>
        </div>
      </div>
    );
  }

  if (!livros || livros.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">📚 Nenhum livro cadastrado ainda.</p>
        <p className="text-gray-400">Clique em "+ Novo Livro" para começar!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {livros.map((livro) => (
        <LivroCard
          key={livro.id}
          livro={livro}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
