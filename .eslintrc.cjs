/**
 * ESLint config for the Vite + React + TypeScript app.
 *
 * CommonJS (`.cjs`) on purpose: package.json sets `"type": "module"`, so a
 * plain `.eslintrc.js` would be parsed as ESM and fail to load.
 *
 * Kept deliberately lean: no type-aware rules, so no `parserOptions.project`.
 * That keeps `npm run lint` fast in CI and avoids a second TypeScript program
 * on every run — `tsc --noEmit` already does the type checking.
 */
module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['@typescript-eslint', 'react-refresh'],
  ignorePatterns: [
    // Dependencies and build output — generated, never linted.
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    // Next.js build cache. No longer tracked by Git, but it can still be
    // regenerated locally, so keep it out of the lint run.
    '.next/',
  ],
  rules: {
    // Vite Fast Refresh only works when a module exports components and
    // nothing else. Advisory rather than blocking: barrel/constant modules are
    // a legitimate pattern here, and a stale HMR boundary is not a bug.
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

    // tsconfig already enforces noUnusedLocals/noUnusedParameters. Keep the
    // lint rule (it also covers plain .js), but align its escape hatch with
    // TypeScript's so the two never disagree about intentionally unused names.
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
    ],
  },
  overrides: [
    {
      // Root tooling configs run in Node, not the browser.
      files: ['vite.config.ts', 'tailwind.config.js', 'postcss.config.js', '.eslintrc.cjs'],
      env: { browser: false, node: true },
    },
    {
      // Build scripts are plain Node ES modules (process, fs, URL globals).
      files: ['scripts/**/*.mjs'],
      env: { browser: false, node: true, es2022: true },
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
  ],
};
