/**
 * ESLint flat config for the Vite + React + TypeScript app.
 *
 * Native ESM (`.js`) on purpose: package.json sets `"type": "module"`, and flat
 * config is loaded as a module, so this file needs no `.cjs`/`.mjs` suffix.
 *
 * Kept deliberately lean: no type-aware rules, so no `parserOptions.project`.
 * That keeps `npm run lint` fast in CI and avoids a second TypeScript program
 * on every run — `tsc --noEmit` already does the type checking.
 */
import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

// The extensions the lint run covers. Flat config replaces the old
// `--ext .js,.jsx,.mjs,.ts,.tsx` CLI flag, so the set lives here instead.
const LINTED = ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.ts', '**/*.tsx'];

// Flat config *merges* `languageOptions.globals` down the chain, whereas the old
// eslintrc `env: { browser: false, node: true }` *replaced* the set. Switching
// the browser names off explicitly reproduces that, so a stray `window` in a
// Node-only tooling file is still reported by no-undef.
const nodeOnlyGlobals = {
  ...Object.fromEntries(Object.keys(globals.browser).map((name) => [name, 'off'])),
  ...globals.node,
};

export default [
  {
    // Dependencies and build output — generated, never linted.
    // Next.js build cache. No longer tracked by Git, but it can still be
    // regenerated locally, so keep it out of the lint run.
    ignores: ['node_modules/', 'dist/', 'build/', 'coverage/', '.next/'],
  },

  // Base rule sets, scoped to the extensions we lint.
  { files: LINTED, ...js.configs.recommended },

  {
    files: LINTED,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Half of `plugin:@typescript-eslint/recommended`. The other half —
      // `eslint-recommended` — is TypeScript-only and lives in its own block
      // below, because upstream scopes it to `*.ts/*.tsx/*.mts/*.cts`.
      ...tsPlugin.configs.recommended.rules,

      // `plugin:react-hooks/recommended` as it behaved under v4: just these two
      // rules. v7 ships a much larger `recommended` that pulls in the React
      // Compiler rule set, which is a deliberate opt-in, not a lint upgrade.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

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

      // New in ESLint 10's `recommended`; it was not part of the ESLint 8 rule
      // set this config previously ran. It fires on `let x: T | null = null`
      // followed by a try/catch that either assigns or returns — a deliberate
      // idiom here, not dead code. Off to keep lint semantics identical across
      // the 8 -> 10 move; adopting it is a separate, reviewable decision.
      'no-useless-assignment': 'off',
    },
  },

  {
    // The TypeScript-only half of `plugin:@typescript-eslint/recommended`. It
    // switches off the core rules the TypeScript compiler already enforces (and
    // switches on four it supersedes). Upstream restricts this to TS files via
    // `overrides[0].files`; applying it to plain .js/.mjs would silently drop
    // no-undef, no-const-assign, no-unreachable and 16 others from those files.
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    rules: { ...tsPlugin.configs['eslint-recommended'].overrides[0].rules },
  },

  {
    // Root tooling configs run in Node, not the browser.
    files: ['vite.config.ts', 'tailwind.config.js', 'postcss.config.js'],
    languageOptions: { globals: nodeOnlyGlobals },
  },

  {
    // Build scripts are plain Node ES modules (process, fs, URL globals).
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: nodeOnlyGlobals,
    },
  },
];
