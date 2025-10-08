# Portfolio Site v2

A portfolio site highlighting my development experience, tech stack, and the projects I’ve built.

**Production URL:** https://www.treysouzcodes.dev

## Tech Stack

### Framework & Language

- **[SvelteKit](https://svelte.dev/docs/kit/introduction)** - Framework built on Svelte
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vite.dev/)** - Build tool

### Styling

- **[Tailwind CSS](https://tailwindcss.com/)** - CSS framework
- **[DaisyUI](https://daisyui.com/)** - Tailwind component library
- **[tsParticles](https://particles.js.org/)** - Used for animated bubbles background

### Data & State Management

- **[TanStack Query](https://tanstack.com/query/latest)** - Used to cache API responses
- **[Supabase](https://supabase.com/)** - Backend provider for database and API

### Misc. Libraries

- **[TanStack Table](https://tanstack.com/table/latest)** - Headless table library
- **[Fuse.js](https://www.fusejs.io/)** - Fuzzy search for comboboxes
- **[UUID](https://github.com/uuidjs/uuid#readme)** - Generating unique IDs (leveraged for handling user-facing error dismissals)

### Testing

- **[Vitest](https://vitest.dev/)** - Unit testing
- **[Playwright](https://playwright.dev/)** - E2E testing
- **[Testing Library](https://testing-library.com/docs/svelte-testing-library/intro/)** - Utility functions for unit testing
- **[@axe-core/playwright](https://www.npmjs.com/package/axe-playwright)** - Accessibility testing

### Code Quality & Tooling

- **[ESLint](https://eslint.org/)** - Linter
- **[Prettier](https://prettier.io/)** - Code formatter
- **[Husky](https://typicode.github.io/husky/)** - Git hooks for pre-commit checks
- **[Commitlint](https://commitlint.js.org/)** - Conventional commit enforcement
- **[Semantic Release](https://semantic-release.gitbook.io/semantic-release/)** - Automated versioning and changelog

## Getting Started

### Prerequisites

- **Node.js 24.x**
- **npm**

### Installation

#### 1) Clone the repository

```sh
git clone https://github.com/Treysouz/PortfolioSiteV2.git
```

#### 2) Navigate to project directory

```sh
cd PortfolioSiteV2
```

#### 3) Install dependencies

```sh
npm install
```

### Development

#### - Start development server

```sh
npm run dev
```

### Building

#### 1) Create production build

```sh
npm run build
```

#### 2) Preview production build locally

```sh
npm run preview
```

### Code Quality

#### - Format code

```sh
npm run format
```

#### - Lint code

```sh
npm run lint
```

#### - Type check

```sh
npm run check
```

## Testing

### Unit Tests

#### - Run unit tests

```sh
npm run test:unit
```

#### - Run unit tests with coverage

```sh
npm run test:unit-coverage
```

### E2E Tests

#### - Run E2E tests

```sh
npm run test:e2e
```

#### - Run E2E tests with Playwright UI

```sh
npm run test:e2e-ui
```

### Running All Tests

```sh
npm test
```

## CI/CD

-- Coming Soon --

## Acknowledgments

- Deployed using [Wrangler/Cloudflare](https://developers.cloudflare.com/workers/wrangler/)
- As of 10/08/2025 (when this portion of the README was last updated), Tanstack Table is not compatible with Svelte 5. Code for an adapter to get everything working was leveraged from this [PR](https://github.com/Tanstack/table/pull/5403/files) by [KevinVanday](https://github.com/KevinVandy)
