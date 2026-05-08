import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node }
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
  { plugins: { prettier }, rules: { ...prettierConfig.rules, 'prettier/prettier': 'error' } }
]);
