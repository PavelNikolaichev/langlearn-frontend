# Frontend for Langlearn

This is the frontend for the Langlearn project, a language learning platform that allows users to create and study flashcards using Anki-like repetition, or AI-generated exercises.

Currently this project is in development, and for now the main issue is to standardize the codebase/styles and make it more maintainable, also there's a lot of room for improvement for caching and optimizing db queries.

For backend implementation, please refer to the [Langlearn Backend](https://github.com/PavelNikolaichev/LangLearn.Backend)

## Project Setup

Firstly, set up the environment variables by copying the `.env.example` file to `.env` and filling in the required values.

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
