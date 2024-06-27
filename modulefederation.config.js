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
        'react',
        'react-dom',
        'react-dom/client',
        'clsx',
        '@mui/material',
        {
            name: '@mui/styles',
            requiredVersion: '5.14.14'
        },
        '@mui/system',
        '@mui/material/styles',
        '@mui/icons-material',
        'prop-types',
        '@iobroker/adapter-react-v5',
        'react-ace',
        '@iobroker/vis-2-widgets-react-dev',
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
