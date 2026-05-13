# Documentation site

This folder is a **[Docusaurus](https://docusaurus.io/)** project (separate from the API in `src/`).

## Commands

| Command         | Description                                                               |
| --------------- | ------------------------------------------------------------------------- |
| `npm install`   | Install site dependencies                                                 |
| `npm run start` | Local dev server (default [http://localhost:4000](http://localhost:4000)) |
| `npm run build` | Production static site → `build/`                                         |
| `npm run serve` | Preview the production build (port **4000**)                              |

From the **repository root** you can use:

- `npm run docs:dev`
- `npm run docs:build`
- `npm run docs:serve`

## Content

- Markdown sources: `docs/`
- Sidebar: `sidebars.js`
- Site config: `docusaurus.config.js`

See the live doc **Maintaining the documentation site** for ports, Mermaid, and GitHub Pages `baseUrl`.
