export function LivroCard({ livro, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{livro.titulo}</h3>
        <p className="text-gray-600">por {livro.autor}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
        <div>
          <span className="font-semibold">ISBN:</span> {livro.isbn}
        </div>
        <div>
          <span className="font-semibold">Ano:</span> {livro.anoPublicacao}
        </div>
        <div>
          <span className="font-semibold">Gênero:</span> {livro.genero}
        </div>
        <div>
          <span className="font-semibold">Disponíveis:</span> {livro.quantidadeDisponivel}
        </div>
      </div>

      {livro.descricao && (
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{livro.descricao}</p>
      )}

      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-blue-600">R$ {livro.preco.toFixed(2)}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(livro)}
          className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600"
        >
          ✏️ Editar
        </button>
        <button
          onClick={() => onDelete(livro.id)}
          className="flex-1 bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600"
        >
          🗑️ Deletar
        </button>
      </div>
    </div>
  );
}
