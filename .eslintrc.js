module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-undef': 'off',
    'no-return-assign': 'off',
    'vue/max-len': ['error', { code: 100, ignoreHTMLAttributeValues: true }],
    'max-len': 'off',
    'vue/valid-v-slot': ['error', { allowModifiers: true }],
    // 'max-len': ['error', { "ignoreStrings": true }]
    'import/no-unresolved': ['error', { ignore: ['^virtual:'] }],
  },
  globals: {
    $ref: 'readonly',
    $computed: 'readonly',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
