// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  { ignores: ['dist/', '.astro/', 'node_modules/'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Astro's build pipeline auto-generates /// <reference path="../.astro/types.d.ts" />
      // in env.d.ts — allow path-style triple-slash references
      '@typescript-eslint/triple-slash-reference': ['error', { path: 'always' }],
    },
  },
];
