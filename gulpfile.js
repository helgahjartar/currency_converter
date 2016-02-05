var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var jshint 	    = require('gulp-jshint');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "home.html"
        }
    });

    gulp.watch("*.html").on("change", browserSync.reload);
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('js/*js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], browserSync.reload);

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("js/*.js", ['js-watch']);
});

// Static Server + fylgist með scss/html file-um
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./verkefni4"
    });

    gulp.watch("verkefni4/sass/*.scss", ['sass']);
    gulp.watch("verkefni4/*.html").on('change', browserSync.reload);
});

// Compile-ar sass í CSS & auto-inject-ar inn í browsers
gulp.task('sass', function() {
    return gulp.src("./sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

// inspectar .js skrár og birtir villur
gulp.task('inspect', function () {
  return gulp.src(['./*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['serve', 'browser-sync', 'inspect']);




