/* eslint-disable spellcheck/spell-checker */
/* eslint-disable no-undef */
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'ci',
                'chore',
                'docs',
                'feat',
                'fix',
                'perf',
                'refactor',
                'revert',
                'style',
                'config',
            ],
        ],
    },
};
