var gulp = require('gulp'),
fs = require('fs'),
clean = require("gulp-clean"),
uglify = require("gulp-uglify"),
concat = require("gulp-concat"),
header = require("gulp-header"),
zip = require("gulp-zip"),
runSequence = require('run-sequence');
 
var getVersion = function () {
    info = require("./package.json");
    return info.version;
};
var getCopyright = function () {
    return fs.readFileSync('Copyright');
};

gulp.task('js', function () {
    // Concatenate and Minify JS
    return gulp.src(['./src/blockrain.jquery.libs.js', './src/blockrain.jquery.src.js', './src/blockrain.jquery.themes.js'])
    .pipe(concat('blockrain.jquery.js'))
    .pipe(header(getCopyright(), {version: getVersion()}))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify({preserveComments:'none'}))
    .pipe(concat('blockrain.jquery.min.js'))
    .pipe(header(getCopyright(), {version: getVersion()}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('css', function () {
    // CSS
    return gulp.src(['./src/blockrain.css'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('blocks', function () {
    // CSS
    return gulp.src(['./assets/blocks/custom/*.*'])
    .pipe(gulp.dest('./dist/assets/blocks/custom'));
});

gulp.task('readme', function () {
    // Readme
    return gulp.src(['./README.md'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
    .pipe(clean());
});

gulp.task('dist', function () {
    // Create a ZIP File
    return gulp.src(['./dist/**/*.*'])
    .pipe(zip('blockrain.zip'))
    .pipe(gulp.dest('./dist'));
});


gulp.task('build', function(callback){
  runSequence('clean', 
              'js', 'css', 'blocks', 'readme', 'dist',
              callback);
});

gulp.task('default', ['build']);
