// this file contains the configuration for the craco project
// Usage in file craco.config.js:
// module.exports = require('@iobroker/vis-2-widgets-react-dev/craco.config.js');

const CracoEsbuildPlugin = require('craco-esbuild');
const { ProvidePlugin } = require('webpack');
// const cracoModuleFederation = require('craco-module-federation');
const cracoModuleFederation = require('./craco-module-federation'); // use local patched version

module.exports = {
    plugins: [
        { plugin: CracoEsbuildPlugin },
        {
            plugin: cracoModuleFederation,
            options: { useNamedChunkIds: true },
        }
    ],
    devServer: {
        proxy: {
            '/_socket': 'http://localhost:8082',
            '/vis.0': 'http://localhost:8082',
            '/adapter': 'http://localhost:8082',
            '/habpanel': 'http://localhost:8082',
            '/vis': 'http://localhost:8082',
            '/widgets': 'http://localhost:8082/vis',
            '/widgets.html': 'http://localhost:8082/vis',
            '/web': 'http://localhost:8082',
            '/state': 'http://localhost:8082',
        },
    },
    webpack: {
        output: {
            publicPath: 'auto',
        },
        plugins: [
            new ProvidePlugin({
                React: 'react',
            }),
        ],
        configure: webpackConfig => {
            webpackConfig.output.publicPath = 'auto';
            return webpackConfig;
        },
    },
};
