# NestJS REST API sample
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

## Description

NestJS REST API sample for typical project

## Table of Contents

- [Features](#features)
- [Quick run](#quick-run)
- [Comfortable development](#comfortable-development)
- [Links](#links)
- [Database utils](#database-utils)

## Features

- [x] Database ([typeorm](https://www.npmjs.com/package/typeorm)).
- [x] Seeding ([typeorm-seeding](https://www.npmjs.com/package/typeorm-seeding)).
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Sign in and sign up via email.
- [x] Admin and User roles.
- [x] Swagger.
- [x] Docker.
- [x] GitLab CI

## Quick run

```bash
git clone --depth 1 https://github.com/khodorkovskyalexey/nestjs-rest-api-sample.git my-app
cd my-app/
cp env-example .env
```

Change `DB_HOST=127.0.0.1` to `DATABASE_HOST=postgres`

```bash
docker-compose up -d
```

For check status run

```bash
docker-compose logs
```

## Comfortable development

```bash
git clone --depth 1 https://github.com/khodorkovskyalexey/nestjs-rest-api-sample.git my-app
cd my-app/
cp env-example .env
```

Run additional container:

```bash
docker-compose up -d postgres adminer redis
```

```bash
yarn install
yarn migration
yarn seeds
yarn start:dev
```

## Links

- Swagger: http://localhost:5000/api
- Adminer (client for DB): http://localhost:8080

## Database utils

Generate migration

```bash
yarn migration:generate CreatingMigrationName
```

Run migration

```bash
yarn migration
```

Revert migration

```bash
yarn migration:revert
```

Sync all tables in database

```bash
yarn schema:sync
```

Drop all tables in database

```bash
yarn schema:drop
```

Run seeds

```bash
yarn seeds
```

## Stay in touch

Author - [Alexey Khodorkovsky](https://github.com/khodorkovskyalexey)

## License

[MIT license](LICENSE).