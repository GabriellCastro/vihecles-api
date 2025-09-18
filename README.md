# 🚗 Vehicles API

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16-darkblue.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue.svg)](https://www.postgresql.org/)
[![Test Coverage](https://img.shields.io/badge/Coverage-55.48%25-yellow.svg)](#test-coverage)
[![License](https://img.shields.io/badge/License-UNLICENSED-red.svg)](#)

Uma API REST robusta e moderna para gerenciamento de veículos, construída com NestJS, TypeScript e Clean Architecture.

## 📋 Sobre o Projeto

A **Vehicles API** é um sistema completo para gerenciamento de veículos que permite:

- ✅ **Cadastrar** novos veículos com validação completa
- 🔍 **Consultar** veículos (listagem e busca por ID)
- ✏️ **Atualizar** informações de veículos existentes
- 🗑️ **Remover** veículos do sistema
- 📚 **Documentação** automática com Swagger
- 🧪 **Testes** unitários e end-to-end abrangentes
- 🏗️ **Clean Architecture** com separação de responsabilidades

### 🏛️ Arquitetura

O projeto segue os princípios da **Clean Architecture** e **SOLID**:

```
src/
├── app/
│   ├── app.module.ts                    # Módulo principal
│   └── vehicle/                         # Módulo de veículos
│       ├── controller/                  # Camada de apresentação
│       │   ├── dto/                     # Data Transfer Objects
│       │   └── vehicle.controller.ts    # REST Controller
│       ├── service/                     # Camada de serviço
│       │   └── vehicle.service.ts       # Business Service
│       ├── usecases/                    # Casos de uso (Clean Architecture)
│       │   ├── ports/                   # Interfaces/Contratos
│       │   ├── create.usecase.ts
│       │   ├── find-all.usecase.ts
│       │   ├── find-one.usecase.ts
│       │   ├── update.usecase.ts
│       │   └── delete.usecase.ts
│       ├── entities/                    # Entidades de domínio
│       └── domain/                      # Interfaces de domínio
├── services/
│   └── prisma/                          # Configuração do banco
└── main.ts                              # Bootstrap da aplicação
```

## 🚀 Tecnologias

### Core

- **[NestJS](https://nestjs.com/)** `v11.0` - Framework Node.js para APIs escaláveis
- **[TypeScript](https://www.typescriptlang.org/)** `v5.7` - Superset tipado do JavaScript
- **[Prisma](https://www.prisma.io/)** `v6.16` - ORM moderno e type-safe
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional

### Validação & Documentação

- **[class-validator](https://github.com/typestack/class-validator)** - Validação declarativa
- **[class-transformer](https://github.com/typestack/class-transformer)** - Transformação de objetos
- **[Swagger/OpenAPI](https://swagger.io/)** - Documentação automática da API

### Testes

- **[Jest](https://jestjs.io/)** `v30.0` - Framework de testes
- **[Supertest](https://github.com/visionmedia/supertest)** `v7.0` - Testes HTTP
- **[@nestjs/testing](https://docs.nestjs.com/fundamentals/testing)** - Utilitários de teste do NestJS

### Desenvolvimento

- **[ESLint](https://eslint.org/)** - Linter para qualidade de código
- **[Prettier](https://prettier.io/)** - Formatação automática
- **[PNPM](https://pnpm.io/)** - Gerenciador de pacotes eficiente

## 📦 Instalação

### Pré-requisitos

- **Node.js** >= 18.0.0
- **PNPM** >= 8.0.0 (recomendado)
- **PostgreSQL** >= 13.0

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/vehicles-api.git
cd vehicles-api
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/vehicles_db?schema=public"

# Application
NODE_ENV="development"
PORT=3000
```

### 4. Configure o banco de dados

```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma db push

# (Opcional) Popular com dados de exemplo
npx prisma db seed
```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento

```bash
# Modo watch (recarrega automaticamente)
pnpm start:dev

# Modo normal
pnpm start

# Modo debug
pnpm start:debug
```

### Produção

```bash
# Build do projeto
pnpm build

# Executar em produção
pnpm start:prod
```

A API estará disponível em: `http://localhost:3000`

## 📚 Documentação da API

A documentação interativa está disponível via Swagger UI:

🔗 **http://localhost:3000/api/docs**

### Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------||
| `POST` | `/vehicles` | Criar novo veículo |
| `GET` | `/vehicles` | Listar todos os veículos |
| `GET` | `/vehicles/{id}` | Buscar veículo por ID |
| `PATCH` | `/vehicles/{id}` | Atualizar veículo |
| `DELETE` | `/vehicles/{id}` | Remover veículo |

### Exemplo de Payload

```json
{
  "placa": "ABC-1234",
  "chassi": "9BWZZZ377VT123456",
  "renavam": "12345678901",
  "modelo": "Fusca",
  "marca": "Volkswagen",
  "ano": 1968
}
```

### Validações Implementadas

- **Placa**: Formato brasileiro `ABC-1234`
- **Chassi**: Exatamente 17 caracteres
- **Renavam**: Exatamente 11 dígitos
- **Ano**: Entre 1886 e (ano atual + 1)
- **Campos obrigatórios**: Todos os campos são obrigatórios na criação

## 🧪 Testes

### Executar Testes

```bash
# Testes unitários
pnpm test

# Testes em modo watch
pnpm test:watch

# Testes com cobertura
pnpm test:cov

# Debug de testes
pnpm test:debug
```

### Test Coverage

| Tipo de Arquivo  | Cobertura  | Funções    | Linhas     | Branches  |
| ---------------- | ---------- | ---------- | ---------- | --------- |
| **Controllers**  | 100%       | 100%       | 100%       | 75%       |
| **Services**     | 100%       | 100%       | 100%       | 100%      |
| **DTOs**         | 100%       | 100%       | 100%       | 100%      |
| **Use Cases**    | 60%        | 50%        | 50%        | 0%        |
| **Repositories** | 9.09%      | 0%         | 9.09%      | 0%        |
| **Geral**        | **55.48%** | **56.66%** | **51.85%** | **40.9%** |

#### 📊 Estatísticas de Testes

- **26 testes unitários** ✅
- **20 testes de controller** com cenários completos
- **6 testes de service** com mocks apropriados
- **Testes E2E** configurados com banco de dados de teste
- **Isolamento completo** entre testes

#### 🎯 Cenários Testados

**Controllers:**

- ✅ Criação de veículos (sucesso/erro)
- ✅ Listagem completa e vazia
- ✅ Busca por ID (encontrado/não encontrado)
- ✅ Atualização (completa/parcial/erro)
- ✅ Remoção (sucesso/erro)
- ✅ Validações de entrada
- ✅ Tratamento de erros

**Services:**

- ✅ Injeção de dependências
- ✅ Chamadas corretas para use cases
- ✅ Propagação de erros

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
pnpm start:dev          # Servidor em modo desenvolvimento
pnpm start:debug        # Servidor com debug habilitado

# Build e Produção
pnpm build              # Compilar TypeScript
pnpm start:prod         # Executar versão compilada

# Qualidade de Código
pnpm lint               # Verificar e corrigir problemas
pnpm format             # Formatar código com Prettier

# Testes
pnpm test               # Testes unitários
pnpm test:cov           # Testes com cobertura
pnpm test:watch         # Testes em modo watch

# Banco de Dados
npx prisma generate     # Gerar cliente Prisma
npx prisma db push      # Aplicar schema ao banco
npx prisma studio       # Interface visual do banco
```

## 🗃️ Estrutura do Banco de Dados

### Tabela: `Vehicle`

| Campo | Tipo | Descrição |
|-------|------|-----------||
| `id` | String (UUID) | Identificador único (chave primária) |
| `placa` | String | Placa do veículo (formato ABC-1234) |
| `chassi` | String | Número do chassi (17 caracteres) |
| `renavam` | String | Número do RENAVAM (11 dígitos) |
| `modelo` | String | Modelo do veículo |
| `marca` | String | Marca do veículo |
| `ano` | Integer | Ano de fabricação |

## 🚧 Roadmap

### Próximas Funcionalidades

- [ ] Autenticação e autorização (JWT)
- [ ] Paginação nos endpoints de listagem
- [ ] Filtros e busca avançada
- [ ] Upload de imagens de veículos
- [ ] Histórico de modificações (audit log)
- [ ] Cache com Redis
- [ ] Rate limiting
- [ ] Métricas e monitoramento

### Melhorias Técnicas

- [ ] Aumentar cobertura de testes para 90%+
- [ ] Implementar testes de integração completos
- [ ] Docker e Docker Compose
- [ ] CI/CD com GitHub Actions
- [ ] Documentação de arquitetura
- [ ] Performance benchmarks

---

<div align="center">

**Feito com ❤️ usando NestJS e TypeScript**

[⬆ Voltar ao topo](#-vehicles-api)

</div>
