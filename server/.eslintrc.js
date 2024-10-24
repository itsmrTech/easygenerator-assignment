/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable spellcheck/spell-checker */
const npmLS = require('npmls')();
const allESLintRules = require('all-eslint-rules')({
    useEslintrc: false,
});

const { getDictionary } = require('./dictionary.eslintrc.js');

const dictionary = getDictionary({
    nodeModulesList: npmLS,
    allESLintRules: allESLintRules,
});
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'spellcheck/spell-checker': [
            1,
            {
                comments: true,
                strings: true,
                identifiers: true,
                templates: true,
                lang: 'en_US',
                skipWords: [
                    'dict',
                    'aff',
                    'hunspellchecker',
                    'hunspell',
                    'utils',
                    'dto',
                    'lang',
                    'enum',
                    'timestamps',
                    'utf8',
                    ...dictionary,
                ],

                skipIfMatch: [
                    'http://[^s]*',
                    '^[-\\w]+/[-\\w\\.]+$',
                    '@[\\w]+',
                    '.*-.*',
                    '$.*',
                ],
                skipWordIfMatch: ['^foobar.*$'],
                minLength: 3,
            },
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
                ignoredNodes: [
                    'FunctionExpression > .params[decorators.length > 0]',
                    'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
                    'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
                ],
            },
        ],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
    },
    plugins: ['@typescript-eslint', 'spellcheck'],
};
