const makeShared = (pkgs, eager) => {
    const result = {};
    pkgs.forEach(
        packageObj => {
            if (typeof packageObj === 'string') {
                result[packageObj] = {
                    version: '*',
                    requiredVersion: '*',
                    singleton: true,
                    eager,
                };
            } else {
                result[packageObj.name] = {
                    version: packageObj.version || '*',
                    requiredVersion: packageObj.requiredVersion || '*',
                    singleton: packageObj.singleton !== undefined ? packageObj.singleton : true,
                    eager: packageObj.eager !== undefined ? packageObj.eager : eager,
                };
            }
        },
    );

    return result;
};

// How to use
// const makeFederation = require('@iobroker/vis-2-widgets-react-dev/modulefederation.config');
// module.exports = makeFederation(
//     'vis2materialWidgets',
//     {
//         './Thermostat': './src/Thermostat',
//         './Actual': './src/Actual',
//         './Static': './src/Static',
//         './Switches': './src/Switches',
//     }
// );

function makeFederation(name, exposes, eager, _shared) {
    const shared = [
        '@iobroker/adapter-react-v5',
        '@iobroker/adapter-react-v5/i18n/de.json',
        '@iobroker/adapter-react-v5/i18n/en.json',
        '@iobroker/adapter-react-v5/i18n/es.json',
        '@iobroker/adapter-react-v5/i18n/ru.json',
        '@iobroker/adapter-react-v5/i18n/nl.json',
        '@iobroker/adapter-react-v5/i18n/it.json',
        '@iobroker/adapter-react-v5/i18n/pl.json',
        '@iobroker/adapter-react-v5/i18n/pt.json',
        '@iobroker/adapter-react-v5/i18n/fr.json',
        '@iobroker/adapter-react-v5/i18n/uk.json',
        '@iobroker/adapter-react-v5/i18n/zh-cn.json',
        '@iobroker/vis-2-widgets-react-dev',
        '@mui/icons-material',
        '@mui/material',
        '@mui/system',
        'prop-types',
        'react',
        'react-ace',
        'react-dom',
        'react-dom/client',
        ...(_shared || []),
    ];

    return {
        name,
        filename: 'customWidgets.js',
        exposes,
        shared: makeShared(shared, eager),
    }
}

module.exports = makeFederation;
