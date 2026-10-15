import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        { group: ['../*', './*/../*'], message: 'Import through the ~/ alias.' },
                    ],
                },
            ],
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'ImportNamespaceSpecifier',
                    message: 'Import the names you use, never the whole module.',
                },
            ],
            'object-curly-spacing': ['error', 'always'],
            'eol-last': ['error', 'always'],
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        },
    },
    {
        ignores: ['build/**', '.react-router/**', 'node_modules/**', 'supabase/**', 'app/types/database.ts'],
    },
    prettierConfig,
)
