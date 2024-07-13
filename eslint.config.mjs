import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    ignores: ['**/*.config/*', 'bin', '.husky', 'commitlint.config.js', 'eslint.config.js', 'node_modules'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jquery,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
];
