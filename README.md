# Node.js Express API boilerplate

Production-minded REST API starter with **Express 5**, **MongoDB** (Mongoose 9), **JWT** auth, **Joi** validation, **Passport**, structured logging, and **Swagger UI** in development.

Use it as a **GitHub template** or clone and rename for your own service.

## Features

- **Express 5** with layered architecture: routes → controllers → services → models
- **Authentication**: register, login, refresh tokens, reset password, email verification (stubs wired to SMTP)
- **Users** CRUD with roles (`user`, `admin`) and pagination plugin
- **Security**: Helmet, CORS, rate limiting on auth (production), Mongo operator sanitization (Express 5–safe), JWT strategy
- **Validation**: Joi + centralized `validate` middleware
- **Errors**: `ApiError`, unified converter/handler, `http-status` v2–compatible helper
- **Docs**: Swagger / OpenAPI at `/v1/docs/` in `NODE_ENV=development` (short URL `/docs` redirects there in dev)
- **Tooling**: ESLint, Prettier, Husky, Commitlint, Jest (no sample tests yet; `passWithNoTests` enabled)

## Requirements

- **Node.js** 18+ (or **Bun** as a package runner; the app runs on Node)
- **MongoDB** 4.4+ (local, Docker, or Atlas)

## Quick start

1. **Create env file**

   ```bash
   cp .env.example .env
   ```

   Set `MONGODB_URL`, a strong `JWT_SECRET` for any non-local use, and real SMTP values if you need email flows.

2. **Install dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```

   If you use Bun for installs: `bun install` (same `package.json`).

3. **Start MongoDB** (if you use the default URL)

   Example with the included Compose service:

   ```bash
   docker compose up -d mongodb
   ```

   Or point `MONGODB_URL` at Atlas / another instance.

4. **Run in development**

   ```bash
   npm run dev
   ```

   Server: `http://localhost:3000` (or `PORT` from `.env`).

5. **API & docs**
   - Health-style page: `GET /`
   - API base: `/v1`
   - Swagger (development only): `http://localhost:3000/v1/docs/` or `http://localhost:3000/docs` (redirects in dev)

## Environment variables

| Variable                                                                 | Description                                                                                            |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `NODE_ENV`                                                               | `development`, `production`, or `test`                                                                 |
| `PORT`                                                                   | HTTP port (default `3000`)                                                                             |
| `MONGODB_URL`                                                            | Mongo connection string (tests append `-test` to the DB name)                                          |
| `JWT_SECRET`                                                             | Secret for signing tokens — **must be long and random in production**                                  |
| `JWT_ACCESS_EXPIRATION_MINUTES`                                          | Access token lifetime                                                                                  |
| `JWT_REFRESH_EXPIRATION_DAYS`                                            | Refresh token lifetime                                                                                 |
| `JWT_RESET_PASSWORD_EXPIRATION_MINUTES`                                  | Reset-password token lifetime                                                                          |
| `JWT_VERIFY_EMAIL_EXPIRATION_MINUTES`                                    | Verify-email token lifetime                                                                            |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `EMAIL_FROM` | Nodemailer transport; optional for local API-only work (you will see a warning if SMTP is unreachable) |

See `.env.example` for placeholders.

## NPM scripts

| Script                                               | Purpose                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------ |
| `npm run dev`                                        | Nodemon + `NODE_ENV=development`                             |
| `npm start`                                          | PM2 from `ecosystem.config.json` (non-daemon)                |
| `npm test`                                           | Jest (exits 0 with no tests until you add some)              |
| `npm run test:watch`                                 | Jest watch mode                                              |
| `npm run coverage`                                   | Coverage report                                              |
| `npm run lint` / `npm run lint:fix`                  | ESLint                                                       |
| `npm run prettier` / `npm run prettier:fix`          | Prettier on `src/**/*.js`                                    |
| `npm run docker:dev` / `docker:prod` / `docker:test` | Compose stacks (extra compose files must exist in your tree) |

## Project layout

```text
src/
  app.js                 # Express app, middleware order, /v1 mount
  index.js               # HTTP server, DB connect, graceful signals
  config/                # env (Joi), passport, logger, tokens, roles
  db/                    # Mongoose connect
  routes/v1/             # Route modules; docs only in development
  controllers/v1/        # HTTP handlers
  services/v1/           # Business logic
  models/                # User, Token + plugins (paginate, toJSON)
  middlewares/           # auth, validate, error, rate limit, mongo sanitize
  validations/           # Joi schemas
  utils/                 # ApiError, catchAsync, httpStatus shim, pick
  docs/                  # Swagger definition fragments
```

## Using this as a template

After “Use this template” or a fresh clone:

1. Rename the package in `package.json` and update `description` / `author`.
2. Replace branding in `src/app.js` (HTML on `GET /`) and in `src/docs/swaggerDef.js`.
3. Rotate **all** secrets in `.env`; never commit `.env`.
4. Add a **LICENSE** and, if open source, **CONTRIBUTING.md**.
5. Add **tests** under `src` or `tests/` and remove or tighten `passWithNoTests` in `jest.config.js` when you have coverage you care about.
6. Consider **GitHub Actions** (lint + test on PR) and Dependabot.

## API overview (v1)

| Area  | Base path                                                                  |
| ----- | -------------------------------------------------------------------------- |
| Auth  | `/v1/auth` (register, login, logout, tokens, password reset, verify email) |
| Users | `/v1/users` (admin/user rules per route)                                   |

Open Swagger in development for exact payloads and responses.

## Notes

- **Express 5**: Wildcard route patterns like `'*'` are invalid for `path-to-regexp` v8; this project uses compatible patterns (e.g. CORS `OPTIONS`).
- **Mongoose 9**: Deprecated connection flags were removed; connect with `MONGODB_URL` only.
- **npm**: If `npm install` fails on peer dependencies (e.g. Commitlint vs `inquirer`), use `npm install --legacy-peer-deps` as above.

## Credits

Boilerplate derived from common Node/Express/Mongo patterns; originally labeled StudentX360 in `package.json` — update when you fork.
