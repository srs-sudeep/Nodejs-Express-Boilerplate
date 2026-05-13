---
sidebar_position: 3
---

# Command reference

All commands assume the **repository root** unless noted.

## API application

| Command             | What it does                                                                         |
| ------------------- | ------------------------------------------------------------------------------------ |
| `npm run dev`       | `NODE_ENV=development` + **nodemon** on `src/index.js` (hot restart on file changes) |
| `npm start`         | **PM2** non-daemon per `ecosystem.config.json` (`NODE_ENV=production` in PM2 env)    |
| `node src/index.js` | Direct run (no reload); same code path as production boot                            |

## Quality gates

| Command                | What it does                                                  |
| ---------------------- | ------------------------------------------------------------- |
| `npm test`             | **Jest** in-band; `passWithNoTests: true` until you add tests |
| `npm run test:watch`   | Jest watch mode                                               |
| `npm run coverage`     | Coverage report to terminal + `coverage/`                     |
| `npm run lint`         | ESLint over the repo                                          |
| `npm run lint:fix`     | ESLint with `--fix`                                           |
| `npm run prettier`     | Check formatting for `src/**/*.js`                            |
| `npm run prettier:fix` | Write Prettier formatting                                     |

## Docker (npm aliases)

| Command               | What it does                              |
| --------------------- | ----------------------------------------- |
| `npm run docker:dev`  | Compose: base + `docker-compose.dev.yml`  |
| `npm run docker:prod` | Compose: base + `docker-compose.prod.yml` |
| `npm run docker:test` | Compose: base + `docker-compose.test.yml` |

Requires those override YAML files to exist.

## Git / commits

| Command           | What it does                                             |
| ----------------- | -------------------------------------------------------- |
| `npm run commit`  | Commitizen with `CZ_SKIP_HOOK=true` (see `package.json`) |
| `npm run prepare` | Husky install hook (`node .husky/install.mjs`)           |

## Documentation site (Docusaurus)

Run from **`website/`** or use root shortcuts (after you add them — see repository `package.json`):

| Command         | Directory  | What it does                                                              |
| --------------- | ---------- | ------------------------------------------------------------------------- |
| `npm run start` | `website/` | Dev server (default port **4000**; see `start` in `website/package.json`) |
| `npm run build` | `website/` | Static production build → `website/build/`                                |
| `npm run serve` | `website/` | Preview production build locally (port **4000**)                          |

Root-level shortcuts (if present):

```bash
npm run docs:dev
npm run docs:build
npm run docs:serve
```

## Typical day-one sequence

```bash
cp .env.example .env
docker compose up -d mongodb
npm install --legacy-peer-deps
npm run dev
```

Then in another shell:

```bash
curl -i http://127.0.0.1:3000/
```

Back to: [Environment setup E2E](./environment-setup-e2e)
