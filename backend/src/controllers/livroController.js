import { criar, excluir, listar, buscarPorId, atualizar } from '../models/livroModel.js';

function validarId(id) {
  return typeof id === 'string' && id.trim().length > 0;
}

function validarCamposObrigatorios(dados) {
  const obrigatorios = ['titulo', 'autor', 'isbn', 'anoPublicacao', 'genero', 'preco'];

  return obrigatorios.filter((campo) => {
    const valor = dados[campo];
    return valor === undefined || valor === null || String(valor).trim() === '';
  });
}

export async function listarLivros(req, res) {
  try {
    const livros = await listar();

    return res.status(200).json({
      success: true,
      message: 'Livros listados com sucesso',
      data: livros,
      total: livros.length,
    });
  } catch (error) {
    console.error('Erro ao listar livros:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao listar livros',
      error: error.message,
    });
  }
}

export async function buscarLivroPorId(req, res) {
  try {
    const { id } = req.params;

    if (!validarId(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
    }

    const livro = await buscarPorId(id);

    if (!livro) {
      return res.status(404).json({
        success: false,
        message: 'Livro não encontrado',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Livro encontrado',
      data: livro,
    });
  } catch (error) {
    console.error('Erro ao buscar livro por ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar livro',
      error: error.message,
    });
  }
}

export async function criarLivro(req, res) {
  try {
    const camposFaltando = validarCamposObrigatorios(req.body);

    if (camposFaltando.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Campos obrigatórios ausentes: ${camposFaltando.join(', ')}`,
      });
    }

    const livro = await criar(req.body);

    return res.status(201).json({
      success: true,
      message: 'Livro criado com sucesso',
      data: livro,
    });
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao criar livro',
      error: error.message,
    });
  }
}

export async function atualizarLivro(req, res) {
  try {
    const { id } = req.params;

    if (!validarId(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
    }

    const livroAtualizado = await atualizar(id, req.body);

    if (!livroAtualizado) {
      return res.status(404).json({
        success: false,
        message: 'Livro não encontrado',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Livro atualizado com sucesso',
      data: livroAtualizado,
    });
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao atualizar livro',
      error: error.message,
    });
  }
}

export async function excluirLivro(req, res) {
  try {
    const { id } = req.params;

    if (!validarId(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
    }

    const livroExcluido = await excluir(id);

    if (!livroExcluido) {
      return res.status(404).json({
        success: false,
        message: 'Livro não encontrado',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Livro excluído com sucesso',
      data: livroExcluido,
    });
  } catch (error) {
    console.error('Erro ao excluir livro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao excluir livro',
      error: error.message,
    });
  }
}
