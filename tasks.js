/**
 * Copyright 2018-2026 bluefox <dogafox@gmail.com>
 *
 * MIT License
 *
 */
'use strict';

const fs = require('node:fs');
const { deleteFoldersRecursive, copyFiles } = require('@iobroker/build-tools');

function copyAllFiles() {
    copyFiles(['src/**/*.d.ts'], 'build');
    copyFiles(['README.md'], 'build');
    copyFiles(['LICENSE'], 'build');
    return new Promise(resolve => {
        const package_ = require('./package.json');
        const packageSrc = require('./src/package.json');
        packageSrc.version = package_.version;
        packageSrc.dependencies = package_.dependencies;
        // react, MUI and gui-components come from the host of vis-2, so they are peers and have to reach the
        // published package.json as well
        packageSrc.peerDependencies = package_.peerDependencies;
        !fs.existsSync(`${__dirname}/build`) && fs.mkdirSync(`${__dirname}/build`);
        fs.writeFileSync(`${__dirname}/build/package.json`, JSON.stringify(packageSrc, null, 2));
        resolve();
    });
}

function compile() {
    return new Promise((resolve, reject) => {
        // Install node modules
        const cmd = `npm run tsc`;

        // System call used for update of js-controller itself,
        // because during an installation the npm packet will be deleted too, but some files must be loaded even during the installation process.
        const exec = require('node:child_process').exec;
        const child = exec(cmd, { cwd: __dirname });

        child.stderr.pipe(process.stderr);
        child.stdout.pipe(process.stdout);

        // "close" waits until stdout/stderr are flushed, so tsc output is printed before our messages
        child.on('close', (code /* , signal */) => {
            if (code) {
                reject(new Error(`"${cmd}" failed with exit code ${code}`));
            } else {
                console.log(`"${cmd} in "${__dirname}" finished.`);
                // command succeeded
                resolve();
            }
        });
    });
}

function compileAll() {
    return compile().then(() => {
        copyFiles(['searchI18n.js', 'buildHelper.js', 'modulefederation.config.js'], 'build');

        copyFiles(['src/*'], 'build/src');
    });
}

function exitWithError(text) {
    return error => {
        console.error(`${text}: ${error.message || error}`);
        // let npm (and CI) see that the build failed
        process.exitCode = 1;
    };
}

if (process.argv.includes('--clean')) {
    deleteFoldersRecursive(`${__dirname}/build`);
} else if (process.argv.includes('--copy')) {
    copyAllFiles().catch(exitWithError('Cannot copy files'));
} else if (process.argv.includes('--compile')) {
    compileAll().catch(exitWithError('Cannot compile'));
} else {
    deleteFoldersRecursive(`${__dirname}/build`);
    copyAllFiles()
        .then(() => compileAll())
        .catch(exitWithError('Cannot build'));
}
