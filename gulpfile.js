var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer');
    minify = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin'),
    bs = require('browser-sync').create();

gulp.task('default', ['browsersync', 'watch']);

gulp.task('browsersync', function () {
    bs.init({
        server: "./",
        port: 8080
    });
});

gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['style']);
    gulp.watch('src/js/script.js', ['script']);
    bs.watch('*.html').on('change', bs.reload);
});

gulp.task('style', function() {
    return gulp.src('scss/style.scss', {style : 'expended'})
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass({includePaths: ['scss/**']}))
        .pipe(rename({suffix: '.min'}))
        .pipe(minify())
        .pipe(gulp.dest('css/'))
        .pipe(notify({message: 'Style task is finished'}))
        .pipe(bs.reload({stream: true}));
});

gulp.task('script', function() {
    return gulp.src('js/script.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('js/'))
        .pipe(notify({message: 'Script task is finished'}))
        .pipe(bs.reload({stream: true}));
});

gulp.task('imagemin', function() {
    return gulp.src('imgsrc/**')
        .pipe(imagemin())
        .pipe(gulp.dest('img/'));
});