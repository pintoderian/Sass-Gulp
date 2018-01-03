var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var merge = require('merge-stream');
/* concatenar varios archivos js */
var concat = require('gulp-concat');
var fuentesJs = [
  'js/funciones.js',
  'js/script.js'
];

gulp.task('js', function(){
  gulp.src(fuentesJs)
    .pipe(concat('scripts.js'))
    .pipe(browserify())
    .pipe(gulp.dest('app/js'))
    .pipe(reload({stream:true}))
});

/* Sass con browser sync */

gulp.task('sass', function() {
  gulp.src('scss/app.scss')
    .pipe(autoprefixer())
    .pipe(sass({
      includePaths: ['scss'],
      outputStyle: 'compact'
    }).on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});

/* Usando merge para combinar sass y css en un solo archivo */
/*gulp.task('sass', function() {
  var archivoSass, archivoCss;

  archivoSass = gulp.src('scss/app.scss')
    .pipe(autoprefixer())
    .pipe(sass({
      includePaths: ['scss'],
    }));

    archivoCss = gulp.src('css/core.css');

    return merge(archivoSass, archivoCss)
      .pipe(concat('app.css'))
      .pipe(gulp.dest('app/css/'));
});
*/
gulp.task('serve', ['sass'], function() {
  browserSync.init(["app/css/*.css", "app/js/*.js", "app/*.html"], {
    server: {
      baseDir: 'app'
    }
  });

});

gulp.task('watch', ['sass', 'serve', 'js'], function() {
  gulp.watch(["scss/*.scss"], ['sass']);
  gulp.watch(["js/*.js"], ['js']);
});

gulp.task('default', ['watch']);