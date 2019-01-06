const gulp = require('gulp');
const minify = require('gulp-clean-css');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const del = require('del');

const paths = {
  stylsheets : {
    src: ['./node_modules/bootstrap/dist/css/bootstrap.min.css', 'static/css/style.css'],
    dest: './assets/css'
  },
  images: {
    src: ['./static/img/**/*'],
    dest: './assets/img'
  }
}


// supprimer le dossier assets
const clean = () => del(['assets']);

// exporter nos taches 
/* gulp.task('clean', clean); => 1er méthodes */


     
// Tache pour minifie les styles
const styles = () =>
      gulp.src(paths.stylsheets.src)
      .pipe(minify())
      .pipe(concat('index.css'))
      .pipe(gulp.dest(paths.stylsheets.dest))


 // Tache pour minifie les images

 const images = () =>
      gulp.src(paths.images.src)
      .pipe(imagemin())
      .pipe(gulp.dest(paths.images.dest))

const build = gulp.series(clean, gulp.parallel(styles, images));

 const watch = () =>
      gulp.watch(paths.stylsheets.src, styles)
      gulp.watch(paths.images.src,  images)
      
exports.clean = clean; // 2nd
exports.styles = styles;
exports.images = images;
exports.build = build;
exports.watch = watch;

gulp.task('default', build);