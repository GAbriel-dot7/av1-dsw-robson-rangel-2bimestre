# Biblioteca de Livros - Frontend

Interface em React + Vite para consumir a API da biblioteca de livros da AV1.

## Requisitos

- Node.js instalado
- Backend rodando em `http://localhost:5000`

## Instalação

```bash
npm install
```

## Execução

```bash
npm run dev
```

## Build de produção

```bash
npm run build
```

## Funcionalidades

- Listar livros
- Criar livro
- Editar livro
- Excluir livro
- Buscar por título ou autor

## Configuração da API

Se necessário, defina a URL do backend no arquivo `.env` do frontend:

```bash
VITE_API_URL=http://localhost:5000
```

## Estrutura

```text
src/
├── components/
│   ├── LivroCard.jsx
│   ├── LivroForm.jsx
│   ├── LivroList.jsx
│   └── Navbar.jsx
├── services/
│   └── livroService.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```
