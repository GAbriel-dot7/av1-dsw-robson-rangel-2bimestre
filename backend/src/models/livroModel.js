import { prisma } from '../config/prisma.js';

function normalizarDadosLivro(dados) {
  const livro = {};

  if (dados.titulo !== undefined) livro.titulo = dados.titulo.trim();
  if (dados.autor !== undefined) livro.autor = dados.autor.trim();
  if (dados.isbn !== undefined) livro.isbn = dados.isbn.trim();
  if (dados.anoPublicacao !== undefined) livro.anoPublicacao = Number.parseInt(dados.anoPublicacao, 10);
  if (dados.genero !== undefined) livro.genero = dados.genero.trim();
  if (dados.descricao !== undefined) livro.descricao = dados.descricao.trim();
  if (dados.quantidadeDisponivel !== undefined) {
    livro.quantidadeDisponivel = Number.parseInt(dados.quantidadeDisponivel, 10);
  }
  if (dados.preco !== undefined) livro.preco = Number.parseFloat(dados.preco);

  return livro;
}

export async function listar() {
  return prisma.livro.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function buscarPorId(id) {
  try {
    return await prisma.livro.findUnique({
      where: { id },
    });
  } catch (error) {
    if (error?.code === 'P2025') {
      return null;
    }
    throw error;
  }
}

export async function criar(dadosLivro) {
  const dadosNormalizados = normalizarDadosLivro(dadosLivro);

  return prisma.livro.create({
    data: {
      titulo: dadosNormalizados.titulo,
      autor: dadosNormalizados.autor,
      isbn: dadosNormalizados.isbn,
      anoPublicacao: dadosNormalizados.anoPublicacao,
      genero: dadosNormalizados.genero,
      descricao: dadosNormalizados.descricao ?? '',
      quantidadeDisponivel: dadosNormalizados.quantidadeDisponivel ?? 1,
      preco: dadosNormalizados.preco,
    },
  });
}

export async function atualizar(id, dadosLivro) {
  try {
    const dadosNormalizados = normalizarDadosLivro(dadosLivro);

    return await prisma.livro.update({
      where: { id },
      data: {
        ...(dadosNormalizados.titulo !== undefined && { titulo: dadosNormalizados.titulo }),
        ...(dadosNormalizados.autor !== undefined && { autor: dadosNormalizados.autor }),
        ...(dadosNormalizados.isbn !== undefined && { isbn: dadosNormalizados.isbn }),
        ...(dadosNormalizados.anoPublicacao !== undefined && { anoPublicacao: dadosNormalizados.anoPublicacao }),
        ...(dadosNormalizados.genero !== undefined && { genero: dadosNormalizados.genero }),
        ...(dadosNormalizados.descricao !== undefined && { descricao: dadosNormalizados.descricao }),
        ...(dadosNormalizados.quantidadeDisponivel !== undefined && {
          quantidadeDisponivel: dadosNormalizados.quantidadeDisponivel,
        }),
        ...(dadosNormalizados.preco !== undefined && { preco: dadosNormalizados.preco }),
      },
    });
  } catch (error) {
    if (error?.code === 'P2025') {
      return null;
    }
    throw error;
  }
}

export async function excluir(id) {
  try {
    return await prisma.livro.delete({
      where: { id },
    });
  } catch (error) {
    if (error?.code === 'P2025') {
      return null;
    }
    throw error;
  }
}