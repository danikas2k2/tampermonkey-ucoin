import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import functional from 'eslint-plugin-functional';
import imp from 'eslint-plugin-import'; // 'import' is ambiguous & prettier has trouble
import jest from 'eslint-plugin-jest';
import a11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';

export default [
    {
        plugins: { react },
        rules: react.configs['jsx-runtime'].rules,
        settings: {
            react: {
                version: 'detect', // You can add this if you get a warning about the React version when you lint
            },
        },
    },
    {
        plugins: { 'jsx-a11y': a11y },
        rules: a11y.configs.recommended.rules,
    },
    {
        plugins: { 'react-hooks': hooks },
        rules: hooks.configs.recommended.rules,
    },
    {
        plugins: { jest },
        rules: jest.configs.recommended.rules,
    },
    prettier,
    {
        ignores: [
            'coverage/*',
            'dist/*',
            'node_modules/*',
        ],
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser,
            parserOptions: {
                ecmaFeatures: { modules: true },
                ecmaVersion: 'latest',
                project: './tsconfig.json',
            },
        },
        plugins: {
            functional,
            import: imp,
            '@typescript-eslint': ts,
            ts,
        },
        rules: {
            ...ts.configs['eslint-recommended'].rules,
            ...ts.configs['recommended'].rules,
            'react-hooks/exhaustive-deps': 'off', // disabled because of errors
            'ts/return-await': 2,
        },
    },
];
