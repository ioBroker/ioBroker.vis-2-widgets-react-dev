const dir = require('node-dir');
// Extend Acorn parser with JSX
const acorn = require('acorn');
const jsx = require('acorn-jsx');
const parser = acorn.Parser.extend(jsx());

// Extend Acorn walk with JSX
const walk = require('acorn-walk');
const { extend } = require('acorn-jsx-walk');
extend(walk.base);

const keys = [];

function findKeys(src, name) {
    return new Promise(resolve =>
        dir.readFiles(src || __dirname + '/../../../src',
            {
                match: /\.jsx?$/,
            },
            (err, content, next) => {
                const result = parser.parse(content, {
                    sourceType: 'module',
                    ecmaVersion: 'latest'
                });

                walk.full(result, node => {
                    if (node.type === 'CallExpression' && node.callee.property?.type === 'Identifier' && node.callee.property?.name === 't') {
                        if (node.arguments.length === 1 && node.arguments[0].type === 'Literal' && typeof node.arguments[0].value === 'string') {
                            // This is for the case `t` is called with a single string
                            // literal as argument.
                            if (!keys.includes(node.arguments[0].value)) {
                                keys.push(node.arguments[0].value);
                            }
                        } else {
                            // In case you have things like template literals as well,
                            // or multiple arguments, you'd need to handle them here too.
                            console.log(`Cannot calculate: "${content.slice(node.arguments[0].start, node.arguments[0].end)}"`);
                        }
                    }
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
                keys.forEach(key => all[key] = key.replace(name + '_', ''));

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
                        }
                    });
                }
                resolve({all, empty});
            },
        )
    );
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
