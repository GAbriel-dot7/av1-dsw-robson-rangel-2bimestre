# Plano de Finalização - AV1 DSW
## Tema: Biblioteca de Livros

**Data Atual:** 14 de maio de 2026  
**Prazo Parte 1:** 08/05 (PASSADO - Ajuste urgente)  
**Prazo Parte 2:** 29/05 (15 dias)

---

## FASE 1: BACKEND - Estrutura do Prisma (2-3 dias)
**Status:** Crítico - necessário revisar e padronizar

### 1.1 - Atualizar schema.prisma
- [ ] Definir entidade `Livro` com campos:
  - `id` (String @id @default(cuid()))
  - `titulo` (String @unique)
  - `autor` (String)
  - `isbn` (String @unique)
  - `anoPublicacao` (Int)
  - `genero` (String)
  - `descricao` (String @db.Text)
  - `quantidadeDisponivel` (Int @default(1))
  - `preco` (Float)
  - `createdAt` (DateTime @default(now()))
  - `updatedAt` (DateTime @updatedAt)

- [ ] Opcional: Entidade `Emprestimo` para rastrear empréstimos de livros
- [ ] Rodar migration: `npx prisma migrate dev --name init_biblioteca`
- [ ] Gerar Prisma Client: `npx prisma generate`

### 1.2 - Atualizar Arquivo .env
- [ ] Verificar conexão MySQL
- [ ] Formato esperado:
  ```
  DATABASE_URL="mysql://user:password@localhost:3306/biblioteca_av1"
  PORT=5000
  ```

---

## FASE 2: BACKEND - API REST Completa (3-4 dias)
**Entregar API funcional com CRUD**

### 2.1 - Controller (Livro)
- [ ] Criar `src/controllers/livroController.js`
- [ ] Implementar:
  - `criar()` - POST
  - `listar()` - GET (com paginação opcional)
  - `obterPorId()` - GET/:id
  - `atualizar()` - PUT/:id
  - `deletar()` - DELETE/:id

### 2.2 - Routes
- [ ] Criar/atualizar `src/routes/livroRoutes.js`
- [ ] Rotas:
  - `POST /livros` - criar novo livro
  - `GET /livros` - listar todos
  - `GET /livros/:id` - obter um livro
  - `PUT /livros/:id` - atualizar
  - `DELETE /livros/:id` - deletar

### 2.3 - Middleware de Erro
- [ ] Adicionar tratamento de erros global
- [ ] Validação de dados de entrada

### 2.4 - Testes (Postman/Insomnia)
- [ ] Testar todos os endpoints
- [ ] Validar respostas JSON
- [ ] Confirmar CRUD funcionando

---

## FASE 3: FRONTEND - Estrutura React (2-3 dias)

### 3.1 - Setup Tailwind CSS
- [ ] Instalar Tailwind: `npm install -D tailwindcss postcss autoprefixer`
- [ ] Gerar config: `npx tailwindcss init -p`
- [ ] Configurar `index.css` com diretivas Tailwind

### 3.2 - Estrutura de Componentes
- [ ] `src/components/LivroCard.jsx` - Card individual de livro
- [ ] `src/components/LivroForm.jsx` - Formulário criar/editar
- [ ] `src/components/LivroList.jsx` - Lista de livros
- [ ] `src/components/Navbar.jsx` - Navegação

### 3.3 - Páginas
- [ ] `src/pages/Home.jsx` - Listar livros
- [ ] `src/pages/Criar.jsx` - Criar novo livro
- [ ] `src/pages/Editar.jsx` - Editar livro existente

### 3.4 - Service API
- [ ] Criar `src/services/livroService.js`
- [ ] Funções:
  - `buscarTodos()`
  - `buscarPorId(id)`
  - `criar(dados)`
  - `atualizar(id, dados)`
  - `deletar(id)`

---

## FASE 4: FRONTEND - Integração com Backend (3-4 dias)

### 4.1 - Implementar Requisições
- [ ] Conectar fetch/axios ao backend
- [ ] Listar livros na Home
- [ ] Criar novo livro com formulário
- [ ] Editar livro existente
- [ ] Deletar livro com confirmação

### 4.2 - Estados e Loading
- [ ] Adicionar loading spinner
- [ ] Mensagens de erro
- [ ] Feedback de sucesso (Toast/Alert)
- [ ] Validações no formulário

### 4.3 - Navegação
- [ ] React Router básico
- [ ] Links entre páginas
- [ ] Botões de ação (Criar, Editar, Deletar)

### 4.4 - Styling com Tailwind
- [ ] Estilizar componentes
- [ ] Responsividade básica
- [ ] Layout limpo e profissional

---

## FASE 5: Testes e Finalização (2-3 dias)

### 5.1 - Testes End-to-End
- [ ] Criar novo livro
- [ ] Listar livros
- [ ] Editar livro
- [ ] Deletar livro
- [ ] Validar fluxo completo

### 5.2 - Verificação de Requisitos
- [ ] Backend com CRUD funcionando
- [ ] Frontend em React com componentes reutilizáveis
- [ ] Tailwind CSS aplicado
- [ ] Consumo de API funcionando
- [ ] Tratamento de erros e loading
- [ ] Navegação básica

### 5.3 - GitHub
- [ ] Commits organizados com mensagens claras
- [ ] README descritivo em `backend/` e `frontend/`
- [ ] Instruções de execução
- [ ] Estrutura: `backend/` e `frontend/`

### 5.4 - Documentação
- [ ] Listar endpoints no README
- [ ] Exemplos de requisição/resposta
- [ ] Instruções para rodar localmente

---

## CRONOGRAMA RECOMENDADO

| Fase | Atividade | Dias | Prazo |
|------|-----------|------|-------|
| 1 | Backend - Prisma | 2-3 | 16/05 |
| 2 | Backend - API REST | 3-4 | 19/05 |
| 3 | Frontend - Setup | 2-3 | 22/05 |
| 4 | Frontend - Integração | 3-4 | 25/05 |
| 5 | Testes e Finalização | 2-3 | 29/05 |

---

## CHECKLIST FINAL (Critérios de Avaliação)

### Parte 1 (Backend - 5.0 pts)
- [ ] **Lógica de Armazenamento (4.0 pts)**
  - Banco MySQL configurado
  - Prisma mapeando entidade Livro corretamente
  - Migrations criadas

- [ ] **Setup de Ambiente (3.0 pts)**
  - Backend estruturado em MVC
  - Conectado ao MySQL
  - .env configurado

- [ ] **Viabilidade Técnica (2.0 pts)**
  - API funcional com CRUD
  - Retorna JSON válido
  - Testado via Postman/Insomnia

- [ ] **GitHub (1.0 pt)**
  - Repositório único
  - Estrutura backend/ e frontend/
  - README descritivo

### Parte 2 (Frontend - 5.0 pts)
- [ ] **Clareza da Proposta (3.0 pts)**
  - Sistema demonstra interação do usuário com dados
  - Fluxo claro de ação

- [ ] **Estrutura de Interface (4.0 pts)**
  - Componentes reutilizáveis
  - Listagens funcionando
  - Tailwind CSS aplicado

- [ ] **Organização (2.0 pts)**
  - Código estruturado
  - Navegação compreensível

- [ ] **GitHub (1.0 pt)**
  - Commits organizados
  - Instruções de execução

---

## DICAS IMPORTANTES

1. **Não perca tempo** - Você está atrasado na Parte 1
2. **Teste constantemente** - Cada fase deve ter testes
3. **Commits regulares** - Faça commit após cada funcionalidade
4. **Mensagens descritivas** - Commits devem indicar o que foi feito
5. **README claro** - Explique como rodar o projeto
6. **Dados de teste** - Crie alguns livros de exemplo no banco para testar
7. **CORS** - Não esqueça de configurar CORS no Express se frontend rodar em porta diferente

---

## Próximos Passos Imediatos
1. ✅ Confirmar MySQL funcionando
2. ✅ Revisar/criar schema.prisma para Livro
3. ✅ Testar conexão com banco
4. ✅ Começar a implementar controller de livros
