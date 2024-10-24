/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');

const builtinModules = require('builtin-modules');

// https://gist.github.com/jrencz/becd1befac3f14b53039e0361087794c#gistcomment-3430019
const nodeModules = (list) =>
    Array.from(
        new Set(
            list ||
                []

                    // Handle NPM scoped packages
                    // See https://github.com/charlike/npmls/issues/3
                    .map((name) => name.replace(/^@/, ''))

                    // Turns names delimited with various delimiters into words
                    .reduce(
                        (collector, name) =>
                            collector.concat(...name.split(/[_\-/.]/)),
                        []
                    )

                    // Handle digit-ending words: foo3 -> foo
                    .map((name) => name.replace(/(\w+)\d+$/, '$1'))
        )
    );

const whitelist = fs
    .readFileSync(path.join(__dirname, './spell.dict'))
    .toString()
    .split('\n')
    .map((word) => word.replace(/\/\/.*$/, '')) // So you can add comments to the words
    .map((word) => word.trim()) // Remove any leading/trailing whitespace
    .filter((word) => word); // Remove any empty lines

const getDictionary = ({ nodeModulesList, allESLintRules }) => [
    ...(nodeModules(nodeModulesList) || []),
    ...(builtinModules || []),
    ...(allESLintRules || []),
    ...(whitelist || []),
];

// console.log(123123, { getDictionary });

module.exports = {
    getDictionary,
};
