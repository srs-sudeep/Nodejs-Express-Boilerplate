---
sidebar_position: 2
---

# Docker workflows

The repository ships a **`docker-compose.yml`** (and optional override files referenced in `package.json`). This page describes **end-to-end** Docker usage from the repo root.

## What ships in `docker-compose.yml`

| Service       | Image / build        | Published ports | Purpose                                                                                           |
| ------------- | -------------------- | --------------- | ------------------------------------------------------------------------------------------------- |
| **`mongodb`** | `mongo:4.2.1-bionic` | `27017:27017`   | Database for local / compose dev                                                                  |
| **`server`**  | `build: .`           | `5000:5000`     | API container (expects `MONGODB_URL=mongodb://mongodb:27017/node-boilerplate` inside the network) |

Networks: `node-network` bridge. Volume: `dbdata` for Mongo data.

> **Note:** The API container exposes **5000** in this file; your local `npm run dev` typically uses **`PORT` from `.env` (3000)**. Treat Compose as a **separate** run mode from bare-metal `npm run dev`.

---

## Workflow A — Mongo only (most common for local dev)

**Goal:** Run database in Docker; run API on the host with `npm run dev`.

1. Start Mongo:

   ```bash
   docker compose up -d mongodb
   ```

2. Ensure `.env` has:

   ```bash
   MONGODB_URL=mongodb://127.0.0.1:27017/node-boilerplate
   ```

3. From repo root:

   ```bash
   npm run dev
   ```

4. Tear down when finished (data kept in named volume unless you remove volumes):

   ```bash
   docker compose stop mongodb
   ```

To **wipe data**:

```bash
docker compose down -v
```

---

## Workflow B — Full stack in Compose

**Goal:** API + Mongo both in containers as defined in `docker-compose.yml`.

```bash
docker compose up --build
```

- API available at **`http://localhost:5000`** (per compose port mapping).
- Adjust health checks or front-end URLs if your fork changes ports.

Stop:

```bash
docker compose down
```

---

## Workflow C — npm script aliases

`package.json` defines:

| Script                | Compose files                                    |
| --------------------- | ------------------------------------------------ |
| `npm run docker:dev`  | `docker-compose.yml` + `docker-compose.dev.yml`  |
| `npm run docker:prod` | `docker-compose.yml` + `docker-compose.prod.yml` |
| `npm run docker:test` | `docker-compose.yml` + `docker-compose.test.yml` |

These **only work** if the referenced override files exist in your tree. If a file is missing, add it or invoke `docker compose` manually with the files you maintain.

Example pattern:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

---

## Environment inside containers

- **`server`** service sets `MONGODB_URL=mongodb://mongodb:27017/node-boilerplate` in the sample `docker-compose.yml`.
- For production images, inject secrets with **Compose env files**, **Docker secrets**, or your orchestrator — **do not** bake real `JWT_SECRET` into the image.

---

## Procedural checklist (release-minded)

1. Build image: `docker compose build server`
2. Run migrations / seed scripts **only if your fork adds them** (this template does not ship migrations)
3. Pass `NODE_ENV=production` and strong `JWT_SECRET` at runtime
4. Health-check `GET /` or add a dedicated `/health` route in your fork

Related: [Environment setup E2E](./environment-setup-e2e) · [Command reference](./command-reference)
