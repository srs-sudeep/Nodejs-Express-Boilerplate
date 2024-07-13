import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    ignores: ['bin', '.husky', 'commitlint.config.js', 'eslint.config.js', 'node_modules'],
  },
  { languageOptions: { globals: { ...globals.node } } },
  pluginJs.configs.recommended,
];
