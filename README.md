## Description


## Features
  - [x] Autenticação utilizando JWT
  - [x] Autorização através de "roles"
  - [x] Validação
  - [] Paginação
  - [] Filtragem
## 1) Instalando dependencias

```bash
$ yarn install
```

## 2) Configurando enviroment
Basta duplicar o arquivo ".env.example", renomeá-lo para ".env" e preencher com valores válidos.

## 3) Rodando a aplicação

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run build
$ yarn run start:prod
```

## Testando

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```