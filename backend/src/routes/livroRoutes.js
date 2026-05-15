import express from 'express';
import {
  criarLivro,
  listarLivros,
  buscarLivroPorId,
  atualizarLivro,
  excluirLivro
} from '../controllers/livroController.js';

const router = express.Router();

// Rotas de livro
router.post('/livros', criarLivro);           // POST - Criar
router.get('/livros', listarLivros);          // GET - Listar todos
router.get('/livros/:id', buscarLivroPorId);  // GET - Obter por ID
router.put('/livros/:id', atualizarLivro);    // PUT - Atualizar
router.delete('/livros/:id', excluirLivro);   // DELETE - Deletar

export default router;
