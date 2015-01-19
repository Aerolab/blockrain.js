var gulp = require('gulp'),
fs = require('fs'),
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
    .pipe(gulp.dest('./build'))
    .pipe(uglify({preserveComments:'none'}))
    .pipe(concat('blockrain.jquery.min.js'))
    .pipe(header(getCopyright(), {version: getVersion()}))
    .pipe(gulp.dest('./build'));
});

gulp.task('css', function () {
    // CSS
    return gulp.src(['./src/blockrain.css'])
    .pipe(gulp.dest('./build'));
});

gulp.task('readme', function () {
    // Readme
    return gulp.src(['./README.md'])
    .pipe(gulp.dest('./build'));
});

gulp.task('dist', function () {
    // Create a ZIP File
    return gulp.src('./build/*')
    .pipe(zip('blockrain.zip'))
    .pipe(gulp.dest('./dist'));
});


gulp.task('build', function(callback){
  runSequence('js', 'css', 'readme', 'dist',
              callback);
});

gulp.task('default', ['build']);
