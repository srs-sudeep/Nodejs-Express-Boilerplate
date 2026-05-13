---
sidebar_position: 2
---

# Request flow

End-to-end **HTTP lifecycle** inside the Express app: middleware order, routing, and error path.

## Middleware order (global)

Order is defined in `src/app.js` (top to bottom). Simplified:

```mermaid
flowchart TD
  A[Incoming request] --> B[Morgan access log]
  B --> C[Helmet security headers]
  C --> D[express.json / urlencoded]
  D --> E[Mongo operator sanitize\nExpress 5–safe wrapper]
  E --> F[compression]
  F --> G[cors + OPTIONS]
  G --> H[passport.initialize]
  H --> I{Path}
  I -->|GET /| J[HTML status page]
  I -->|/v1/*| K[v1 router]
  I -->|other| L[404 ApiError]
  K --> M[Route handler stack\nvalidate / auth / controller]
  M --> N[JSON or stream response]
  L --> O[errorConverter → errorHandler]
  M -.->|thrown error| O
```

### Why order matters

1. **Body parsers** must run before anything that reads `req.body`.
2. **Sanitization** runs after parsing so it can walk objects safely.
3. **Passport** runs before `/v1` so JWT strategy is available to `auth()` on routes.
4. **404** is a bare middleware after `/v1` — only unmatched paths hit it.
5. **Errors** go through `errorConverter` (normalize to `ApiError`) then `errorHandler` (JSON payload, status code).

## Authenticated route (conceptual sequence)

```mermaid
sequenceDiagram
  participant C as Client
  participant E as Express
  participant P as passport-jwt
  participant V as validate(Joi)
  participant Ctrl as Controller
  participant Svc as Service
  participant DB as MongoDB

  C->>E: GET /v1/users + Bearer JWT
  E->>P: auth() middleware
  P->>P: verify JWT + load user
  alt invalid token
    P-->>C: 401 Unauthorized
  end
  E->>V: validate query/body
  alt validation error
    V-->>C: 400 + message
  end
  E->>Ctrl: handler
  Ctrl->>Svc: business call
  Svc->>DB: Mongoose query
  DB-->>Svc: documents
  Svc-->>Ctrl: result
  Ctrl-->>C: 200 JSON
```

## Errors and status codes

- Operational errors use **`ApiError`** with `statusCode` and `message`.
- Unknown errors are converted in **`errorConverter`** (`src/middlewares/error.js`): Mongoose validation-style errors map to **400**, others to **500** unless `statusCode` is already set.
- **`http-status`** is imported via `src/utils/httpStatus.js` so **v2** (`default` export) works correctly.

## Related

- [Source tree](./source-tree) — file-level map
- [Environment setup E2E](../procedures/environment-setup-e2e) — run the stack locally
