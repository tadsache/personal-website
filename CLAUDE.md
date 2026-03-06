# Personal Website — Claude Instructions

## Frontend Design

**Always use the `frontend-design` skill** for any UI work — components, pages, layouts, styling. Invoke it with the Skill tool before writing any frontend code.

This is a personal website with a blog. Design quality matters. Avoid generic AI aesthetics.

## Stack

- **Next.js** (App Router) with TypeScript
- **Tailwind CSS** for styling
- **MDX** for blog content (files in `/content/posts/`)
- Static export (`output: 'export'`) for Hikaru hosting

## Project conventions

- Blog posts live as `.mdx` files in `content/posts/`
- No backend, no database — everything is statically generated at build time
- Keep it simple: no over-engineering

## Commands

- `npm run dev` — start dev server
- `npm run build` — build static export
