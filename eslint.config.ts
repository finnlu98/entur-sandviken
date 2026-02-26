import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  // --- Base recommended rules for all files ---
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // --- Prettier must be last — disables all ESLint rules that Prettier handles ---
  eslintConfigPrettier,

  // --- Global ignores ---
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/__generated__/**',
      '**/generated/**',

    ],
  },

  // --- Shared TypeScript rules (client + server) ---
  {
    files: ['client/**/*.{ts,tsx}', 'server/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      'no-duplicate-imports': 'error',
    },
  },

  // --- Client-specific rules ---
  {
    files: ['client/**/*.{ts,tsx}'],
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // --- Server-specific rules ---
  {
    files: ['server/**/*.ts'],
    rules: {
      'no-console': 'off', // Server code legitimately uses console for logging
    },
  },
);