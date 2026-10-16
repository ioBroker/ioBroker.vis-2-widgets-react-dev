/**
 * Copyright 2018-2026 bluefox <dogafox@gmail.com>
 *
 * MIT License
 */
'use strict';

const { moduleFederationShared } = require('@iobroker/types-vis-2/modulefederation.vis.config');

/**
 * Build the module-federation configuration of a vis-2 widget set.
 *
 * The list of shared modules is NOT kept here. It comes from `@iobroker/types-vis-2`, the same source vis-2
 * itself builds with, because the two have to agree: a widget set that shares something else than the host
 * either loads a second copy of it or is handed one it was not built for. The previous version of this file
 * carried its own copy of the list, and it drifted - it never learned about `react/jsx-runtime`, so every
 * widget set built with it bundled its own JSX runtime. React 19 rejects elements made by an older runtime,
 * which takes the whole widget set down while it is being loaded.
 *
 * @param {string} name - name of the widget set, the same as in `io-package.json` under `common.visWidgets`
 * @param {Record<string, string>} exposes - the widgets of the set, e.g. `{ './Thermostat': './src/Thermostat' }`
 * @param {boolean} [eager] - load the shared modules eagerly
 * @param {string[]} [additionalShared] - modules of this widget set that have to be shared on top
 * @returns {object} Configuration for the module-federation plugin
 */
function makeFederation(name, exposes, eager, additionalShared) {
    const shared = moduleFederationShared();

    for (const packageName of additionalShared || []) {
        shared[packageName] = { requiredVersion: '*', singleton: true };
    }

    if (eager) {
        for (const packageName of Object.keys(shared)) {
            shared[packageName].eager = true;
        }
    }

    return {
        name,
        filename: 'customWidgets.js',
        exposes,
        shared,
    };
}

module.exports = makeFederation;
