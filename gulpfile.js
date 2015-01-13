var gulp = require('gulp')
, fs = require('fs')
, uglify = require("gulp-uglify")
, concat = require("gulp-concat")
, header = require("gulp-header");
 
var getVersion = function () {
    info = require("./package.json");
    return info.version;
};
var getCopyright = function () {
    return fs.readFileSync('Copyright');
};

gulp.task('build', function () {
    gulp.src(['./src/blockrain.jquery.libs.js', './src/blockrain.jquery.src.js', './src/blockrain.jquery.themes.js'])
    .pipe(concat('blockrain.jquery.js'))
    .pipe(header(getCopyright(), {version: getVersion()}))
    .pipe(gulp.dest('./build'))
    .pipe(uglify({preserveComments:'none'}))
    .pipe(concat('blockrain.jquery.min.js'))
    .pipe(header(getCopyright(), {version: getVersion()}))
    .pipe(gulp.dest('./build'));
});

gulp.task('default', ['build']);
