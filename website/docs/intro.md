---
sidebar_position: 1
title: Introduction
---

# Express + MongoDB API boilerplate

This documentation site describes the **Node.js Express boilerplate** in the repository root: a REST API with JWT auth, Mongoose, Joi validation, and Swagger UI in development.

## Who this is for

- Engineers **cloning or using the repo as a GitHub template** who need a single map of architecture and commands
- Contributors who want **request flow**, **Docker**, and **operational** context without reading the whole codebase first

## How to read these docs

| Section          | Purpose                                                                      |
| ---------------- | ---------------------------------------------------------------------------- |
| **Architecture** | System context, HTTP lifecycle, and folder responsibilities                  |
| **Procedures**   | Copy-paste **end-to-end** flows: local machine, Docker, and every npm script |
| **Guides**       | API surface, Swagger, and how to maintain this Docusaurus site               |

## Quick links

- [First-time environment setup](./procedures/environment-setup-e2e) — from empty folder to running API
- [Docker workflows](./procedures/docker-workflows) — Mongo only vs full stack
- [System design](./architecture/system-design) — diagrams and trust boundaries

## Live API vs this site

- **This site** (Docusaurus) defaults to port **4000** when you run `npm run start` inside `website/` (see the `start` script in `website/package.json`).
- The **REST API** uses `PORT` from `.env` (default **3000**). You can run **both at once** with those defaults.
