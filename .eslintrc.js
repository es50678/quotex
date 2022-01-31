module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  plugins: [
    '@typescript-eslint',
    'import'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  ignorePatterns: ['**/*.js', '**/*.d.ts'],
  rules: {
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/brace-style': 'error',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/comma-spacing': 'error',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/keyword-spacing': 'error',
    '@typescript-eslint/no-duplicate-imports': 'error',
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/quotes': ['error', 'single', { 'avoidEscape': true }],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
    '@typescript-eslint/no-unused-vars': ['warn', { "argsIgnorePattern": "^_" }],
    '@typescript-eslint/unbound-method': ['error', { 'ignoreStatic': true }],
    'import/no-default-export': 'error',
  }
};
