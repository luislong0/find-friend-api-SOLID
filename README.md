# Find a Friend API

## Descrição

Find a Friend API é uma aplicação que facilita a adoção de animais de várias organizações. Os usuários podem visualizar e adotar animais disponíveis para adoção em sua cidade por meio desta API.

## Rotas

- `POST /requirement/create`: Criar requisitos de adoção (Requer papel de administrador).
- `PUT /requirement/edit`: Editar requisitos de adoção (Requer papel de administrador).
- `DELETE /requirement/delete/:adoptionId`: Excluir requisitos de adoção (Requer papel de administrador).
- `POST /organizations`: Registrar-se como uma organização.
- `POST /sessions`: Autenticar-se como uma organização.
- `PATCH /token/refresh`: Atualizar o token de autenticação.
- `PUT /organization/edit`: Editar informações da organização.
- `GET /pet/characteristic`: Encontrar animais por características.
- `GET /pet/information/:id`: Encontrar informações de um animal por ID.
- `GET /pet/city/:city`: Encontrar animais disponíveis para adoção em uma cidade específica.
- `POST /pet/create`: Criar um novo animal para adoção (Requer papel de administrador).
- `DELETE /pet/delete/:petId`: Excluir um animal (Requer papel de administrador).

## Scripts

- `start:dev`: Observar e iniciar o servidor de desenvolvimento.
- `start`: Iniciar o servidor de produção.
- `test:create-prisma-environment`: Criar o ambiente do Prisma para testes.
- `test:install-prisma-environment`: Instalar o ambiente do Prisma para testes.
- `build`: Construir a aplicação.
- `test:unit`: Executar testes unitários no diretório `src/use-cases`.
- `test:unit:watch`: Observar e executar testes unitários no diretório `src/use-cases`.
- `pretest:e2e`: Executar etapas necessárias antes dos testes end-to-end.
- `test:e2e`: Executar testes end-to-end no diretório `src/http`.
- `test:e2e:watch`: Observar e executar testes end-to-end no diretório `src/http`.
- `test:coverage`: Executar testes com cobertura de código.
- `test:ui`: Executar testes de interface do usuário.
- `lint`: Executar o ESLint no diretório `src` com arquivos `.ts`.
- `lint:fix`: Executar o ESLint no diretório `src` com arquivos `.ts` e corrigir problemas automaticamente.

## Requisitos da Aplicação

### Requisitos Funcionais (RFs)

- [x] Os usuários podem registrar um animal para adoção.
- [x] Os usuários podem visualizar todos os animais disponíveis para adoção em uma cidade específica.
- [x] Os usuários podem filtrar animais por suas características.
- [x] Os usuários podem visualizar informações detalhadas sobre um animal disponível para adoção.
- [x] As organizações podem se registrar como uma organização.
- [x] As organizações podem fazer login na aplicação.

### Regras de Negócio (RNs)

- [x] Ao listar animais, é obrigatório especificar a cidade.
- [x] As organizações devem fornecer um endereço e um número de WhatsApp.
- [x] Um animal deve estar associado a uma organização.
- [x] Os usuários interessados em adoção entrarão em contato com a organização via WhatsApp.
- [x] Todos os filtros, exceto a cidade, são opcionais.
- [x] As organizações precisam estar logadas como administradoras para acessar determinadas funcionalidades.

### Requisitos Não-Funcionais (RNFs)

- [x] As senhas dos usuários devem ser criptografadas.
- [x] Os dados da aplicação devem ser persistidos em um banco de dados PostgreSQL.
- [x] Todas as listas de dados devem ser paginadas com 20 itens por página.
- [x] A autenticação do usuário é feita por meio de JSON Web Tokens (JWT).