---
sidebar_position: 1
---

# API surface and Swagger

## Base URL

All versioned REST endpoints live under **`/v1`**.

| Area                          | Path prefix |
| ----------------------------- | ----------- |
| Authentication                | `/v1/auth`  |
| Users                         | `/v1/users` |
| OpenAPI UI (development only) | `/v1/docs/` |

The HTML landing page **`GET /`** is outside `/v1` and is useful for quick health checks behind load balancers.

## Swagger / OpenAPI

- **Enabled when** `NODE_ENV=development` (see `src/routes/v1/index.js`).
- **Entry:** `http://localhost:<PORT>/v1/docs/` (trailing slash recommended).
- **Shortcut in dev:** `http://localhost:<PORT>/docs` redirects to `/v1/docs/` (see `src/app.js`).

OpenAPI is assembled by **swagger-jsdoc** from:

- `src/docs/*.yml` component fragments
- JSDoc blocks in `src/routes/v1/authRoutes/*.js` and `userRoutes/*.js`

When you add routes, **co-locate** `@swagger` comments with the route file and restart the API so the spec refreshes.

## Auth quick reference

Protected routes use the **`auth()`** middleware (Passport JWT). Clients send:

```http
Authorization: Bearer <access_token>
```

Obtain tokens via the documented `/v1/auth` flows (register, login, refresh).

## Production behaviour

- Swagger routes are **not** mounted outside development.
- Stricter rate limiting applies to `/v1/auth` in production (`app.js`).

Next: [Maintaining this documentation site](./maintaining-documentation)
