import express from 'express';
import {
  criarLivro,
  listarLivros,
  obterLivroPorId,
  atualizarLivro,
  deletarLivro
} from '../controllers/livroController.js';

const router = express.Router();

// Rotas de livro
router.post('/livros', criarLivro);           // POST - Criar
router.get('/livros', listarLivros);          // GET - Listar todos
router.get('/livros/:id', obterLivroPorId);   // GET - Obter por ID
router.put('/livros/:id', atualizarLivro);    // PUT - Atualizar
router.delete('/livros/:id', deletarLivro);   // DELETE - Deletar

export default router;
