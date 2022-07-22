const makeShared = pkgs => {
    const result = {};
    pkgs.forEach(
        packageName => {
            result[packageName] = {
                requiredVersion: '*',
                singleton: true,
            };
        },
    );

    return result;
};

// How to use
// const makeFederation = require('@iobroker/vis-widgets-react-dev/modulefederation.config');
// module.exports = makeFederation(
//     'vis2materialWidgets',
//     {
//         './Thermostat': './src/Thermostat',
//         './Actual': './src/Actual',
//         './Static': './src/Static',
//         './Switches': './src/Switches',
//     }
// );

function makeFederation(name, exposes, _shared) {
    const shared = [
        'react',
        'react-dom',
        'react-dom/client',
        'clsx',
        '@mui/material',
        '@mui/styles',
        '@mui/material/styles',
        '@mui/icons-material',
        'prop-types',
        '@iobroker/adapter-react-v5',
        '@iobroker/vis-widgets-react-dev',
        ...(_shared || [])
    ];

    return {
        name,
        filename: 'customWidgets.js',
        exposes,
        shared: makeShared(shared),
    }
}

module.exports = makeFederation;
