import { typescript } from '@frsource/eslint-config';
import globals from 'globals';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...typescript,
  { ignores: ['**/dist', '**/coverage', '**/node_modules'] },
  {
    files: ['docs/**.js', 'src/**'],
    languageOptions: {
      globals: globals['shared-node-browser'],
    },
  },
];
