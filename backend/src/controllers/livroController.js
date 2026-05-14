import { prisma } from '../config/prisma.js';

// CREATE - Criar novo livro
export const criarLivro = async (req, res) => {
  try {
    const { titulo, autor, isbn, anoPublicacao, genero, descricao, quantidadeDisponivel, preco } = req.body;

    // Validações básicas
    if (!titulo || !autor || !isbn || !anoPublicacao || !genero || !preco) {
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios: titulo, autor, isbn, anoPublicacao, genero, preco'
      });
    }

    const livro = await prisma.livro.create({
      data: {
        titulo,
        autor,
        isbn,
        anoPublicacao: parseInt(anoPublicacao),
        genero,
        descricao: descricao || '',
        quantidadeDisponivel: quantidadeDisponivel ? parseInt(quantidadeDisponivel) : 1,
        preco: parseFloat(preco)
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Livro criado com sucesso',
      data: livro
    });
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao criar livro',
      error: error.message
    });
  }
};

// READ - Listar todos os livros
export const listarLivros = async (req, res) => {
  try {
    const livros = await prisma.livro.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Livros listados com sucesso',
      data: livros,
      total: livros.length
    });
  } catch (error) {
    console.error('Erro ao listar livros:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao listar livros',
      error: error.message
    });
  }
};

// READ - Obter um livro por ID
export const obterLivroPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const livro = await prisma.livro.findUnique({
      where: { id }
    });

    if (!livro) {
      return res.status(404).json({
        success: false,
        message: 'Livro não encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Livro encontrado',
      data: livro
    });
  } catch (error) {
    console.error('Erro ao obter livro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao obter livro',
      error: error.message
    });
  }
};

// UPDATE - Atualizar livro
export const atualizarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, isbn, anoPublicacao, genero, descricao, quantidadeDisponivel, preco } = req.body;

    // Verificar se livro existe
    const livroExistente = await prisma.livro.findUnique({
      where: { id }
    });

    if (!livroExistente) {
      return res.status(404).json({
        success: false,
        message: 'Livro não encontrado'
      });
    }

    const livroAtualizado = await prisma.livro.update({
      where: { id },
      data: {
        ...(titulo && { titulo }),
        ...(autor && { autor }),
        ...(isbn && { isbn }),
        ...(anoPublicacao && { anoPublicacao: parseInt(anoPublicacao) }),
        ...(genero && { genero }),
        ...(descricao !== undefined && { descricao }),
        ...(quantidadeDisponivel !== undefined && { quantidadeDisponivel: parseInt(quantidadeDisponivel) }),
        ...(preco && { preco: parseFloat(preco) })
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Livro atualizado com sucesso',
      data: livroAtualizado
    });
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao atualizar livro',
      error: error.message
    });
  }
};

// DELETE - Deletar livro
export const deletarLivro = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se livro existe
    const livroExistente = await prisma.livro.findUnique({
      where: { id }
    });

    if (!livroExistente) {
      return res.status(404).json({
        success: false,
        message: 'Livro não encontrado'
      });
    }

    await prisma.livro.delete({
      where: { id }
    });

    return res.status(200).json({
      success: true,
      message: 'Livro deletado com sucesso',
      data: livroExistente
    });
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao deletar livro',
      error: error.message
    });
  }
};
