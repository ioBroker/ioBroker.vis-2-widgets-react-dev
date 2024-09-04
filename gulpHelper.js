const fs = require('node:fs');
const {
    ignoreSvgFiles,
    ignoreFiles,
    copyFiles,
    buildWidgets,
    npmInstall,
    deleteFoldersRecursive,
} = require('./buildHelper');

function gulpTasks(gulp, adapterName, root, src, additionalCopy) {
    gulp.task('widget-0-clean', done => {
        deleteFoldersRecursive(`${src}build`);
        deleteFoldersRecursive(`${root}/widgets`);
        done();
    });
    additionalCopy = additionalCopy || [];

    gulp.task('widget-1-npm', async () => npmInstall(src));

    gulp.task('widget-2-compile', async () => buildWidgets(__dirname, src));

    gulp.task('widget-3-copy', () => Promise.all([
        gulp.src([`${src}build/*.js`]).pipe(gulp.dest(`widgets/${adapterName}`)),
        gulp.src([`${src}build/img/*`]).pipe(gulp.dest(`widgets/${adapterName}/img`)),
        gulp.src([`${src}build/*.map`]).pipe(gulp.dest(`widgets/${adapterName}`)),
        gulp.src([
            `${src}build/static/**/*`,
            ...ignoreFiles(src),
        ]).pipe(gulp.dest(`widgets/${adapterName}/static`)),
        gulp.src([
            ...additionalCopy,
            ...copyFiles(src),
        ]).pipe(gulp.dest(`widgets/${adapterName}/static/js`)),
        gulp.src([`${src}src/i18n/*.json`]).pipe(gulp.dest(`widgets/${adapterName}/i18n`)),
        new Promise(resolve =>
            setTimeout(() => {
                if (fs.existsSync(`widgets/${adapterName}/static/media`) &&
                    !fs.readdirSync(`widgets/${adapterName}/static/media`).length
                ) {
                    fs.rmdirSync(`widgets/${adapterName}/static/media`)
                }
                resolve();
            }, 500)
        )
    ]));

    gulp.task('widget-build', gulp.series(['widget-0-clean', 'widget-1-npm', 'widget-2-compile', 'widget-3-copy']));
}

module.exports = {
    ignoreSvgFiles,
    ignoreFiles,
    copyFiles,
    buildWidgets,
    npmInstall,
    deleteFoldersRecursive,
    gulpTasks,
};
