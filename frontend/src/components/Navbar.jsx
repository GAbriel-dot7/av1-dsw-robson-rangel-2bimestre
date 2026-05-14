export function Navbar({ onHome, onCreate }) {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">📚 Biblioteca</h1>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={onHome}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            📖 Home
          </button>
          <button
            onClick={onCreate}
            className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition"
          >
            ➕ Novo Livro
          </button>
        </div>
      </div>
    </nav>
  );
}
