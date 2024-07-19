/**
 * Copyright 2018-2023 bluefox <dogafox@gmail.com>
 *
 * MIT License
 *
 **/
'use strict';

const gulp  = require('gulp');
const fs = require('node:fs');
const { deleteFoldersRecursive } = require('./gulpHelper');

gulp.task('clean', done => {
    deleteFoldersRecursive(`${__dirname}/dist`);
    done();
});

gulp.task('copy', () => Promise.all([
    gulp.src(['src/**/*.d.ts']).pipe(gulp.dest('dist')),
    gulp.src(['README.md']).pipe(gulp.dest('dist')),
    gulp.src(['LICENSE']).pipe(gulp.dest('dist')),
    new Promise(resolve => {
        const package_ = require('./package.json');
        const packageSrc = require('./src/package.json');
        packageSrc.version = package_.version;
        packageSrc.dependencies = package_.dependencies;
        !fs.existsSync(`${__dirname}/dist`) && fs.mkdirSync(`${__dirname}/dist`);
        fs.writeFileSync(`${__dirname}/dist/package.json`, JSON.stringify(packageSrc, null, 2));
        resolve();
    })
]));

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

        child.on('exit', (code /* , signal */) => {
            // code 1 is a strange error that cannot be explained. Everything is installed but error :(
            if (code && code !== 1) {
                reject(`Cannot install: ${code}`);
            } else {
                console.log(`"${cmd} in "${__dirname}" finished.`);
                // command succeeded
                resolve();
            }
        });
    });
}

const babelOptions = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime',
    ],
};

function handleError (error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('compile', gulp.parallel('copy',
//    'typedefs',
    () => Promise.all([
        compile(),
        gulp.src([
            'craco.config.js',
            'modulefederation.config.js',
            'craco-module-federation.js',
            'searchI18n.js',
            'gulpHelper.js',
            'src/package.json'
        ])
            .pipe(gulp.dest('dist')),
    ])
));

gulp.task('default', gulp.series('clean', 'compile'));
