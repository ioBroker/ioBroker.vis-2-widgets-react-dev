const dir = require('node-dir');
const fs = require('fs');
const path = require('path');
// Extend Acorn parser with JSX
const acorn = require('acorn');
const jsx = require('acorn-jsx');
const parser = acorn.Parser.extend(jsx());

// Extend Acorn walk with JSX
const walk = require('acorn-walk');
const { extend } = require('acorn-jsx-walk');
extend(walk.base);

const keys = [];

// you can explore the tree here: https://astexplorer.net/

function findKeys(src, name) {
    return new Promise(resolve => {
        let prefix = '';
        const translationsConfig = src ? path.join(src, 'translations.js') : `${__dirname}/../../../src/translations.js`;
        if (fs.existsSync(translationsConfig)) {
            const translationsResult = parser.parse(fs.readFileSync(translationsConfig), {
                sourceType: 'module',
                ecmaVersion: 'latest'
            });
            walk.fullAncestor(translationsResult, node => {
                if (node.type === 'Property' && node.key.name === 'prefix') {
                    prefix = node.value.value;
                }
            });
        }

        dir.readFiles(src || `${__dirname}/../../../src`,
            {
                match: /\.jsx?$/,
            },
            (err, content, next) => {
                const result = parser.parse(content, {
                    sourceType: 'module',
                    ecmaVersion: 'latest'
                });

                walk.fullAncestor(result, (node, state, ancestors) => {
                    if (node.type === 'CallExpression' && node.callee.property?.type === 'Identifier' && node.callee.property?.name === 't') {
                        if (node.arguments.length && node.arguments[0].type === 'Literal' && typeof node.arguments[0].value === 'string') {
                            // This is for the case `t` is called with a single string
                            // literal as argument.
                            if (!keys.includes(node.arguments[0].value)) {
                                keys.push(node.arguments[0].value);
                            }
                        } else {
                            // In case you have things like template literals as well,
                            // or multiple arguments, you'd need to handle them here too.
                            console.log(`Cannot calculate: "${content.slice(node.arguments[0].start - 10, node.arguments[0].end + 10).replace(/\n/g, '\\n')}"`);
                        }
                    } else
                    if (node.type === 'Property' && node.key.name === 'visAttrs') {
                        const visAttrs = parser.parse(content.slice(node.value.start, node.value.end), {
                            sourceType: 'module',
                            ecmaVersion: 'latest'
                        });
                        walk.full(visAttrs, attrNode => {
                            if (attrNode.type === 'Property' && attrNode.key.name === 'label') {
                                if (!keys.includes(attrNode.value.value)) {
                                    keys.push(attrNode.value.value);
                                }
                            }
                        });
                    } else
                    if (node.type === 'Property' && node.key.name === 'visWidgetLabel') {
                        if (!keys.includes(node.value.value)) {
                            keys.push(node.value.value);
                        }
                    } else
                    if (node.type === 'Property' && node.key.name === 'visSetLabel') {
                        if (!keys.includes(node.value.value)) {
                            keys.push(node.value.value);
                        }
                    } else
                    if (node.type === 'Property' && node.key.name === 'tooltip') {
                        if (ancestors[ancestors.length - 7] &&
                            ancestors[ancestors.length - 7].key &&
                            ancestors[ancestors.length - 7].key.name === 'visAttrs' &&
                            !keys.includes(node.value.value)
                        ) {
                            keys.push(node.value.value);
                        }
                    }
                });
                next();
            },
            () => {
                if (!name) {
                    try {
                        name = require('../../../../package.json').name.replace(/-/g, '_').replace(/^iobroker\./g, '');
                    } catch (e) {
                        name = 'NOT_FILLED';
                    }
                }

                const all = {};
                if (prefix) {
                    keys.forEach((key, index) => {
                        if (key && !key.startsWith(prefix)) {
                            keys[index] = prefix + key;
                        }
                    });
                }
                keys.forEach(key => {
                    if (key) {
                        all[key] = key.replace(name + '_', '');
                        all[key] = all[key].replace(/_/g, ' ');
                        all[key] = all[key][0].toUpperCase() + all[key].substring(1);
                    }
                });
                const empty = {};

                let en;
                try {
                    en = require(src || __dirname + '/../../../src/i18n/en.json');
                } catch (e) {

                }

                if (en) {
                    keys.forEach(key => {
                        if (!en[key]) {
                            empty[key] = all[key];
                        } else {
                            all[key] = en[key];
                        }
                    });
                }
                resolve({all, empty});
            },
        )
    });
}

// If started as allInOne mode => return function to create instance
if (module && module.parent) {
    module.exports = findKeys;
} else {
    // or start the instance directly
    findKeys(process.argv[3], process.argv[2])
        .then(result => {
            console.log('All keys:');
            console.log(JSON.stringify(result.all, null, 2));

            console.log('Empty keys:');
            console.log(JSON.stringify(result.empty, null, 2));
        });
}
