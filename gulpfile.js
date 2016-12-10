var gulp = require('gulp');

gulp.task('server:dev', function () {
    var browserSync = require('browser-sync');
    var staticServer = browserSync.create();

    staticServer.init({
        server: {
            baseDir: './src',
            index: "index.html"
        },

        reloadDelay: 500,
        logLevel: "info"
    });

    // gulp.watch('./src/**/*', []);
});

gulp.task('default', ['server:dev']);
