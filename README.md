A Front-End Developer Portfolio Site.

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Things to consider for proper README

### Why Node 22?

- At the time of development, Vercel only supports up to Node 22.

## 🔍 Workflow Details

### Testing Workflow (Reusable)

**Purpose**: Shared testing logic used by all deployment workflows

**What it does**:

- Runs linting, unit tests, and e2e tests concurrently
- Generates test coverage reports
- Only callable by other workflows (no manual trigger)

### Deploy Workflow (Reusable)

**Purpose**: Shared deployment logic for both preview and production

**What it does**:

- Calls testing.yml workflow first
- Deploys to Vercel (preview or production based on parameters)
- Only deploys if tests pass
- Returns deployment URL for use by calling workflows

### Deploy Preview Workflow

**Triggers**:

- PR opened, updated, or reopened on `main` branch (automatic)
- Manual trigger via workflow_dispatch (manual)

**Flow**:

1. **deploy**: Calls deploy.yml workflow (which calls testing.yml first)
2. **ai-code-review**: Provides AI review (only on PR creation)
3. **comment-results**: Posts summary on PR

### Deploy Production Workflow

**Triggers**:

- Push to `main` branch (automatic)
- Manual trigger via workflow_dispatch (manual)

**Flow**:

1. **deploy**: Calls deploy.yml workflow (which calls testing.yml first)
2. **notify-completion**: Sends success/failure notifications
