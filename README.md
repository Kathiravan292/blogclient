# blogclient

React + TypeScript front end for the blog application, built with Vite. Migrated from
JavaScript/JSX; every screen and route from the previous version is preserved.

## Requirements

- Node.js 20+
- A running [blogserver](../blogserver) instance

## Setup

```bash
npm install
cp .env.example .env   # optional, see below
npm run dev            # http://localhost:5173
```

### Environment

| Variable            | Required | Default                                        | Purpose              |
| ------------------- | -------- | ---------------------------------------------- | -------------------- |
| `VITE_API_BASE_URL` | no       | `https://blogserver-ruo1.onrender.com/api/v1`  | Base URL of the API  |

Point it at a local server while developing:

```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

Only variables prefixed with `VITE_` reach the browser bundle. Whatever you put here is
public once the app is built, so never place a secret in this file.

## Scripts

| Command             | What it does                               |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Dev server with hot module reload          |
| `npm run build`     | Typecheck, then build into `dist/`         |
| `npm run typecheck` | TypeScript only, no output                 |
| `npm run preview`   | Serve the production build locally         |
| `npm run lint`      | ESLint over the whole project              |

## Layout

```
src/
├── main.tsx                     Entry point: router, auth provider, global styles
├── App.tsx                      Shell: navbar, routes, toast container
├── api/                         Typed API layer
│   ├── http.ts                  Axios instance, bearer interceptor, error helpers
│   ├── auth.api.ts              register, login
│   ├── blog.api.ts              blog CRUD
│   └── user.api.ts              profile and user administration
├── components/
│   ├── layout/                  Navbar, Footer
│   ├── routing/                 AppRoutes, ProtectedRoute
│   └── ui/                      BlogForm, StatusMessage
├── config/env.ts                Reads and normalises VITE_ variables
├── context/                     Auth state
│   ├── AuthContext.tsx          The context object
│   ├── AuthProvider.tsx         Provider: state plus localStorage persistence
│   ├── auth.reducer.ts          Reducer and initial state
│   └── auth.types.ts            State, actions, context value
├── hooks/
│   ├── useAuth.ts               Reads the auth context, narrowing away null
│   └── useFetch.ts              Request-on-mount with loading/error/refetch
├── pages/                       One file per route
├── types/                       Domain and response types shared across the app
└── utils/storage.ts             Guarded, typed localStorage wrapper
```

### Naming

- Components and pages are `PascalCase.tsx`, one component per file, named exports
  (`App` is the one default export, as Vite's entry expects).
- Non-component modules are `camelCase.ts`; grouped types and API modules use a
  `*.types.ts` / `*.api.ts` suffix so a folder listing reads as a table of contents.
- Imports use the `@/` alias for anything outside the current folder, so moving a file
  does not mean rewriting a chain of `../../`.

## Routes

| Path                     | Page                | Access        |
| ------------------------ | ------------------- | ------------- |
| `/`                      | `HomePage`          | public        |
| `/getsingleblog/:id`     | `SingleBlogPage`    | public        |
| `/getblogbytopic/:topic` | `BlogsByTopicPage`  | public        |
| `/login`                 | `LoginPage`         | public        |
| `/register`              | `RegisterPage`      | public        |
| `/createblog`            | `CreateBlogPage`    | role `user`   |
| `/editblog/:id`          | `EditBlogPage`      | role `user`   |
| `/users`                 | `UsersPage`         | role `admin`  |
| `/deleteuser/:id`        | `DeleteUserPage`    | role `admin`  |
| anything else            | `NotFoundPage`      | public        |

Role-gated routes are wrapped in `ProtectedRoute`, which reads the live auth context.
An unauthenticated visitor is sent to `/login` with the intended path in router state,
so signing in returns them to where they were going.

## How state and auth fit together

`AuthProvider` holds `{ user, token, role }` and exposes `login`, `logout` and
`updateProfile`. Each of those writes through to `localStorage` as it dispatches, so the
persisted session and the in-memory session cannot disagree.

Components never read the token directly. `api/http.ts` attaches
`Authorization: Bearer <token>` on every request from an interceptor, reading the current
value at request time.
