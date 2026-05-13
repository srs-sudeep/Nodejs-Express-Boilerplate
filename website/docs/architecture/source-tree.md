---
sidebar_position: 3
---

# Source tree

High-level map of **`src/`** (the API). Paths are relative to the repository root.

```text
src/
├── index.js              # Boot: connect MongoDB, listen, signal handlers
├── app.js                # Express factory: middleware, /v1 mount, errors
├── config/
│   ├── config.js         # dotenv + Joi-validated env export
│   ├── logger.js         # Winston
│   ├── morgan.js         # HTTP logging
│   ├── passport.js       # JWT strategy
│   ├── roles.js          # Role constants
│   └── tokens.js         # Token type constants
├── db/
│   └── mongoose.js       # mongoose.connect
├── routes/v1/
│   ├── index.js          # Mounts /auth, /users, /docs (dev only)
│   ├── docs.route.js     # Swagger UI + swagger-jsdoc
│   ├── authRoutes/
│   └── userRoutes/
├── controllers/v1/       # Thin: parse request, call service, send response
├── services/v1/        # Business logic + orchestration
├── models/               # Schemas, plugins (paginate, toJSON)
├── middlewares/
│   ├── auth.js           # passport.authenticate('jwt')
│   ├── validate.js       # Joi from route definition
│   ├── error.js          # errorConverter, errorHandler
│   ├── rateLimiter.js    # express-rate-limit
│   └── mongoSanitizeExpress5.js  # NoSQL injection sanitize (Express 5 query-safe)
├── validations/         # Joi schemas shared with routes
├── utils/                 # ApiError, catchAsync, httpStatus shim, pick
└── docs/                  # YAML fragments for Swagger components
```

## Repository root (not only `src/`)

| Path                    | Role                                                                |
| ----------------------- | ------------------------------------------------------------------- |
| `website/`              | **This Docusaurus documentation site** (separate `package.json`)    |
| `docker-compose.yml`    | `server` + `mongodb` services for containerized dev/prod-style runs |
| `ecosystem.config.json` | PM2 entry for `npm start`                                           |
| `.env.example`          | Template for required environment variables                         |
| `jest.config.js`        | Jest; `passWithNoTests` until you add tests                         |

## Where to add a new feature

1. **Model** (if new persistence) under `src/models/`
2. **Service** under `src/services/v1/`
3. **Controller** under `src/controllers/v1/`
4. **Validation** under `src/validations/`
5. **Route** file + registration in `src/routes/v1/index.js`
6. **Swagger** JSDoc on route file + optional YAML in `src/docs/`

Back: [System design](./system-design)
