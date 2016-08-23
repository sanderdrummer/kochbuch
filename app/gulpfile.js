var gulp = require('gulp');
var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require('gulp-minify-html');
var concat = require('gulp-concat');
var gulpLess = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var es = require('event-stream');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');

var tsConfig = {
    noImplicitAny: true,
    isolatedModules: true,
    target: 'ES5',
    // module: 'umd'
};

// compile and concat less
function less() {
    gulp.src('./less/main.less')
        .pipe(gulpLess())
        .pipe(gulp.dest('../'));
}
gulp.task('less', less);



// libs
gulp.task('lib',lib);
function lib() {
    gulp.src([
        './lib/angular.min.js',
        './lib/uiRouter.js',
        './lib/modules.js'
    ])
        .pipe(concat('lib.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('../'));
}

gulp.task('appJS', appJS);

function appJS() {
    es.merge(getTemplateStream(), getTSStream())
        .pipe(concat('app.js'))

        // uncomment to test minify js
        .pipe(uglify())
        .pipe(gulp.dest('../'));
}
gulp.task('appJS', appJS);

function getTemplateStream() {

    // preCompile angularTemplates and write them to $templateCache
    // for better performance
    return gulp.src('./app/**/*.html')
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: 'CompiledTemplates',
            declareModule: false
        }));
}

function getTSStream() {
    return gulp.src('././app/**/*.ts')
        .pipe(ts(tsConfig));
}
gulp.task('getTSStream', getTSStream);

gulp.task('watchTS', function() {
    gulp.watch('./app/**/*.ts', ['getTSStream']);
});


gulp.task('default', function() {
    gulp.watch('./app/**/*.ts', ['appJS']);
    gulp.watch('./app/**/*.html', ['appJS']);
    gulp.watch('./less/**/*.less', ['less']);
});

gulp.task('build', function() {
    lib();
    appJS();
    less();
});
