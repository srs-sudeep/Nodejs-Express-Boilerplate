---
sidebar_position: 1
---

# Environment setup (end-to-end)

**Goal:** From a clean clone to a running API with MongoDB and a verified `GET /` response.

## Preconditions

- **Node.js** 18+ (20+ recommended; Docusaurus docs site suggests Node 20+)
- **npm** 9+ (or **Bun** for installs; scripts still invoke `node` / `nodemon`)
- **Git**
- **MongoDB** reachable from your machine **or** Docker to run the bundled Mongo service

---

## Step 1 — Clone or generate from template

```bash
git clone <your-repo-url> my-api
cd my-api
```

If you use **GitHub → Use this template**, create a new repo and clone that instead.

---

## Step 2 — Environment file

```bash
cp .env.example .env
```

Edit **`.env`** minimally:

| Variable      | Example                                      | Notes                                            |
| ------------- | -------------------------------------------- | ------------------------------------------------ |
| `NODE_ENV`    | `development`                                | Swagger and `/docs` redirect only in development |
| `PORT`        | `3000`                                       | API listen port                                  |
| `MONGODB_URL` | `mongodb://127.0.0.1:27017/node-boilerplate` | Local default; use Atlas SRV if remote           |
| `JWT_SECRET`  | long random string                           | **Never** ship default to production             |

SMTP keys can stay placeholders until you test email flows; startup will **warn** if SMTP is unreachable.

---

## Step 3 — Install API dependencies

From the **repository root**:

```bash
npm install --legacy-peer-deps
```

`--legacy-peer-deps` avoids a known **peer conflict** between Commitlint’s cz adapter and the pinned `inquirer` major version. If your fork resolves that dependency tree, you can try a plain `npm install`.

**Bun alternative:**

```bash
bun install
```

---

## Step 4 — Start MongoDB

### Option A — Docker (Mongo only)

From the repo root (Compose v2):

```bash
docker compose up -d mongodb
```

Wait until port **27017** accepts connections. The default `MONGODB_URL` in `.env.example` matches this layout.

### Option B — Local `mongod`

Install and start MongoDB yourself; set `MONGODB_URL` accordingly.

### Option C — MongoDB Atlas

Set `MONGODB_URL` to your Atlas connection string (include user, password, and database path as required by Atlas).

---

## Step 5 — Run the API (development)

```bash
npm run dev
```

Expected log lines (paraphrased):

- `Connected to MongoDB`
- `Listening to port <PORT>`
- Optional SMTP warning in development

---

## Step 6 — Smoke test

In another terminal:

```bash
curl -sS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/
```

Expect **`200`**.

Open **Swagger** (development only):

- `http://127.0.0.1:3000/v1/docs/`
- or `http://127.0.0.1:3000/docs` (redirects to the URL above in dev)

---

## Step 7 — Run tests and lint (optional but recommended)

```bash
npm test
npm run lint
```

---

## Port clash (API vs documentation)

By default the **API** uses `PORT=3000` and the **Docusaurus** dev server uses **4000**, so they do not conflict.

If you set the API to **4000** in `.env`, start the docs site on another port:

```bash
cd website
npm run start -- --port 4001
```

Or stop the API while running Docusaurus.

---

## Troubleshooting

| Symptom                   | Likely cause                   | Action                                             |
| ------------------------- | ------------------------------ | -------------------------------------------------- |
| `ECONNREFUSED` Mongo      | Mongo not running / wrong host | Step 4                                             |
| `bad auth` / Atlas errors | Wrong URI or user              | Fix `MONGODB_URL`                                  |
| `spawn nodemon ENOENT`    | Missing devDependency          | `npm install` from root                            |
| `Not found` on `/docs`    | Wrong URL or `NODE_ENV`        | Use `/v1/docs/` in dev; set `NODE_ENV=development` |

Next: [Docker workflows](./docker-workflows) · [Command reference](./command-reference)
