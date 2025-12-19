import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig({
  extends: [
    js.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    prettier,
  ],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: globals.browser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    'array-callback-return': ['error', { checkForEach: true }],
    'no-await-in-loop': 'error',
    'no-constant-binary-expression': 'error',
    'no-constructor-return': 'error',
    'no-duplicate-imports': 'error',
    'no-new-native-nonconstructor': 'error',
    'no-promise-executor-return': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    'no-unused-private-class-members': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    curly: 'error',
    'default-case': 'error',
    eqeqeq: ['error', 'always'],
    'no-alert': 'error',
    'no-console': 'error',
    'sort-imports': ['error', { ignoreDeclarationSort: true }],

    'import/newline-after-import': 'error',
    'import/no-unresolved': ['error', { ignore: ['@params'] }],
    'import/order': [
      'error',
      {
        groups: ['builtin', ['external', 'internal'], ['parent', 'sibling', 'index'], ['object', 'type', 'unknown']],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', orderImportKind: 'asc' },
      },
    ],

    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
});
