# 📚 API de Biblioteca de Livros

## Visão Geral
API REST para gerenciamento de uma biblioteca de livros, desenvolvida com **Node.js**, **Express** e **Prisma**, seguindo o padrão **MVC**.

## 🚀 Quick Start

### 1. Requisitos
- Node.js v25+
- MySQL (XAMPP)
- npm

### 2. Configuração
```bash
# Instalar dependências
npm install

# Copiar e editar .env
cp .env.example .env

# Executar migrations
npx prisma migrate dev

# Rodar servidor
node src/server.js
```

Servidor disponível em: **http://localhost:5000**

---

## 📖 API Endpoints

### Status
```
GET http://localhost:5000/
```

### Livros
```
GET    /livros              # Listar todos
POST   /livros              # Criar novo
GET    /livros/:id          # Obter um
PUT    /livros/:id          # Atualizar
DELETE /livros/:id          # Deletar
```

---

## 📊 Modelo de Dados

### Livro
```json
{
  "id": "uuid",
  "titulo": "string",
  "autor": "string",
  "isbn": "string",
  "anoPublicacao": "integer",
  "genero": "string",
  "descricao": "text",
  "quantidadeDisponivel": "integer",
  "preco": "float",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

## 🔧 Tecnologias

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma
- **Banco**: MySQL
- **Variáveis**: dotenv

---

## 📂 Estrutura

```
src/
├── controllers/
│   └── livroController.js     # Lógica de negócio
├── routes/
│   └── livroRoutes.js         # Definição de rotas
├── config/
│   └── prisma.js              # Configuração Prisma
├── app.js                     # Setup Express
└── server.js                  # Inicialização
```

---

## ✅ Testes

### Criar Livro
```bash
curl -X POST http://localhost:5000/livros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "isbn": "978-8535924892",
    "anoPublicacao": 1899,
    "genero": "Romance",
    "descricao": "Uma obra clássica",
    "quantidadeDisponivel": 5,
    "preco": 45.90
  }'
```

### Listar Todos
```bash
curl http://localhost:5000/livros
```

---

## 🐛 Troubleshooting

| Erro | Solução |
|------|---------|
| "Can't reach database" | Inicie MySQL/XAMPP |
| "Prisma schema validation" | `npx prisma generate` |
| "Module not found" | `npm install` novamente |

---

## 📝 Notas

- A API retorna sempre um objeto `{ success, message, data }`
- CORS está habilitado para requisições do frontend
- Validações básicas nos campos obrigatórios
- ✅ **Escalabilidade**: Facilita a adição de novos recursos
- ✅ **Testabilidade**: Permite testar cada camada independentemente
- ✅ **Reutilização**: Código pode ser reutilizado em diferentes contextos

## 📂 Estrutura do Projeto

```
api-base-2bimestre/
├── src/
│   ├── models/              # Camada de Dados
│   │   └── tarefaModel.js   # Lógica de negócio das tarefas
│   │
│   ├── controllers/         # Camada de Controle
│   │   └── tarefaController.js  # Processa requisições HTTP
│   │
│   ├── routes/              # Definição de Rotas
│   │   └── tarefaRoutes.js  # Rotas da API
│   │
│   ├── views/               # Camada de Apresentação (para futuro frontend)
│   │   └── README.md
│   │
│   ├── config/              # Configurações (vazio no momento)
│   │
│   ├── app.js               # Configuração do Express
│   ├── server.js            # Inicialização do servidor
│   ├── index.js             # Arquivo de teste (opcional)
│   └── tarefas.js           # Arquivo antigo (pode ser removido)
│
├── package.json
└── README.md
```

## 🔄 Fluxo de uma Requisição

```
Cliente → Rota → Controller → Model → Controller → Resposta JSON (View)
```

**Exemplo prático:**

1. **Cliente** faz uma requisição: `GET /tarefas`
2. **Rota** (`tarefaRoutes.js`) identifica a rota e chama o controller
3. **Controller** (`tarefaController.js`) recebe a requisição
4. **Controller** chama o **Model** (`tarefaModel.js`) para buscar os dados
5. **Model** retorna os dados para o **Controller**
6. **Controller** envia a resposta JSON de volta ao **Cliente**

## 🚀 Como Executar

### Instalação

```bash
npm install
```

### Iniciar o Servidor

```bash
npm run dev
```

O servidor estará rodando em: `http://localhost:3000`

## 📡 Endpoints da API

### Listar todas as tarefas

```http
GET /tarefas
```

### Obter uma tarefa específica

```http
GET /tarefas/:id
```

### Criar uma nova tarefa

```http
POST /tarefas
Content-Type: application/json

{
  "descricao": "Minha nova tarefa"
}
```

### Atualizar uma tarefa

```http
PATCH /tarefas/:id
Content-Type: application/json

{
  "descricao": "Tarefa atualizada",
  "concluida": true
}
```

### Excluir uma tarefa

```http
DELETE /tarefas/:id
```

## 🎯 Detalhes das Camadas

### 📊 Model (`models/tarefaModel.js`)

Responsável por:

- Armazenar dados (em memória, por enquanto)
- Implementar lógica de negócio
- Operações CRUD (Create, Read, Update, Delete)

**Funções principais:**

- `obterTodasTarefas()`
- `obterTarefaPorId(id)`
- `criarNovaTarefa(descricao)`
- `atualizarTarefa(id, descricao, status)`
- `excluirTarefa(id)`

### 🎮 Controller (`controllers/tarefaController.js`)

Responsável por:

- Receber requisições HTTP
- Validar dados de entrada
- Chamar métodos do Model
- Retornar respostas HTTP apropriadas

**Funções principais:**

- `listarTarefas(req, res)`
- `obterTarefa(req, res)`
- `criarTarefa(req, res)`
- `atualizarTarefa(req, res)`
- `excluirTarefa(req, res)`

### 🛣️ Routes (`routes/tarefaRoutes.js`)

Responsável por:

- Definir as rotas da API
- Mapear URLs para controllers
- Organizar endpoints por recurso

### ⚙️ App (`app.js`)

Responsável por:

- Configurar middlewares
- Registrar rotas
- Configurar tratamento de erros
- Exportar a aplicação configurada

### 🖥️ Server (`server.js`)

Responsável por:

- Importar a aplicação
- Iniciar o servidor na porta especificada
- Separar lógica de configuração da inicialização

## 🔮 Próximos Passos

- [ ] Integrar banco de dados (MongoDB, PostgreSQL, etc.)
- [ ] Adicionar autenticação e autorização
- [ ] Implementar validação com bibliotecas (Joi, Yup)
- [ ] Criar testes unitários e de integração
- [ ] Adicionar frontend (React, Vue, etc.)
- [ ] Implementar tratamento de erros centralizado
- [ ] Adicionar paginação nas listagens
- [ ] Documentar API com Swagger

## 🛠️ Tecnologias

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web minimalista
- **ES Modules**: Uso de `import/export` ao invés de `require`

## 📝 Scripts Disponíveis

```json
{
  "dev": "np src/server.js", // Inicia o servidor em modo desenvolvimento
  "batata": "node src/index.js" // Executa o arquivo de teste
}
```

## ⚠️ Observações

- Os dados estão armazenados **em memória** e serão perdidos quando o servidor reiniciar
- Para persistência de dados, será necessário integrar um banco de dados
- O diretório `views/` está preparado para receber o frontend no futuro

## 📖 Aprendizado

Este projeto é ideal para entender:

- ✅ Como estruturar uma API REST
- ✅ O que é e como aplicar o padrão MVC
- ✅ Separação de responsabilidades
- ✅ Boas práticas de organização de código
- ✅ Como preparar um projeto para crescer

---

Desenvolvido para fins educacionais 🎓
