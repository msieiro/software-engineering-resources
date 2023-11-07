module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react-hooks/recommended'
    ],
    ignorePatterns: ['dist', 'build', '.eslintrc.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    plugins: ['@typescript-eslint', 'react-refresh'],
    rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/strict-boolean-expressions': 'error',
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true }
        ],
        '@typescript-eslint/no-unsafe-argument': 'off'
    }
}
