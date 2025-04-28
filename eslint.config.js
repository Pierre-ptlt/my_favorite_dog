import { defineConfig } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  {
    ignorePatterns: [
      'dist/',
      'build/',
      'node_modules/',
      '.vitest-cache/',
      '*.config.*',
      'public/libs/pdf.worker.min.js',
      '**/*.json',
      '**/*.snap'
    ]
  },

  {
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:react/jsx-runtime'
    ],
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-function': 'off',

      'react/no-unescaped-entities': 'warn',
      'react/prop-types': 'off'
    }
  }
]);
