import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import checkFile from 'eslint-plugin-check-file';

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
      '**/*.css', // CSS files are not parsed by ESLint — only checked for filename naming
    ],
  },

  // --- Shared TypeScript rules (client + server) ---
  {
    files: ['client/**/*.{ts,tsx}', 'server/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      'no-duplicate-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off', // Disabled for now

      // --- PascalCase for classes, interfaces, type aliases, and enums ---
      '@typescript-eslint/naming-convention': [
        'warn',
        { selector: 'class', format: ['PascalCase'] },
        { selector: 'interface', format: ['PascalCase'] },
        { selector: 'typeAlias', format: ['PascalCase'] },
        { selector: 'enum', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['PascalCase', 'UPPER_CASE'] },
      ],
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

  // --- Browser JS files (index.js, etc.) — declare browser globals ---
  {
    files: ['client/**/*.js', 'client/**/*.jsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // --- Test files — declare Jest globals ---
  {
    files: ['**/*.test.js', '**/*.test.ts', '**/*.spec.js', '**/*.spec.ts'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  // --- File & folder naming conventions (TS/JS/TSX/JSX) ---
  {
    files: ['client/src/**/*.{ts,tsx,js,jsx}', 'server/src/**/*.{ts,js}'],
    plugins: { 'check-file': checkFile },
    rules: {
      // All filenames must be kebab-case (e.g. my-component.tsx, use-auth.ts)
      'check-file/filename-naming-convention': [
        'warn',
        {
          'client/src/**/*.{ts,tsx,js,jsx}': 'KEBAB_CASE',
          'server/src/**/*.{ts,js}': 'KEBAB_CASE',
        },
      ],
      // All folders must be kebab-case (e.g. my-feature/, bus-cards/)
      'check-file/folder-naming-convention': [
        'warn',
        {
          'client/src/**/': 'KEBAB_CASE',
          'server/src/**/': 'KEBAB_CASE',
        },
      ],
    },
  },

  // --- CSS filename naming convention (uses processor — no code parsing) ---
  {
    files: ['client/src/**/*.css'],
    plugins: { 'check-file': checkFile },
    processor: checkFile.processors?.['eslint-processor-check-file'],
    rules: {
      'check-file/filename-naming-convention': ['warn', { 'client/src/**/*.css': 'KEBAB_CASE' }],
    },
  }
);
