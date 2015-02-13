
var path              = require('path');
var gulp              = require('gulp');
var $                 = require('gulp-load-plugins')();
var browserSync       = require('browser-sync');
var reload            = browserSync.reload;
var merge             = require('merge-stream');
var streamqueue       = require('streamqueue');
var del               = require('del');

var config            = require('./build-config');


// ----------------------------------------------------------------------------

// Error notification settings for plumber
var plumberErrorHandler = {
  errorHandler: $.notify.onError({
    title: 'Gulp',
    message: "Error: <%= error.message %>"
  })
};


// ----------------------------------------------------------------------------
// Clean all build output

gulp.task('clean', function(cb) {
  del([
    config.dist.path + '/**'
  ], cb);
});


// ----------------------------------------------------------------------------
// Update the browser

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: config.dist.path
    }
  });
});


// ----------------------------------------------------------------------------
// Styles

gulp.task('styles', function() {
  var
    cssPre = gulp.src(config.src.css.preSass),
    scss = gulp.src(config.src.scss)
      // .pipe($.plumber(plumberErrorHandler))
      .pipe($.rubySass({
        require: ['breakpoint'],
        trace: true
      })),
    cssPost = gulp.src(config.src.css.postSass);

  // Concatenate vendor CSS, then compiled SASS, finally anything found in src/css
  return streamqueue({ objectMode: true }, cssPre, scss, cssPost)
    .pipe($.concat('site.css'))
    .pipe(gulp.dest(config.dist.path + '/css'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.minifyCss())
    .pipe(gulp.dest(config.dist.path + '/css'))
    .pipe(reload({ stream: true }));
});


// ----------------------------------------------------------------------------
// Scripts

gulp.task('scripts', function() {
  return gulp.src(config.src.js)
    // .pipe($.plumber(plumberErrorHandler))
    .pipe($.concat('site.js'))
    .pipe(gulp.dest(config.dist.path + '/js'))
    .pipe($.uglify())
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.dist.path + '/js'))
    .pipe(reload({ stream: true }));
});


// ----------------------------------------------------------------------------
// Static files

gulp.task('files', function() {
  var sources = config.src.files.map(function(spec) {
    return gulp.src(spec.src, { base: spec.base });
  });

  return merge(sources)
    .pipe($.newer(config.dist.path))
    .pipe(gulp.dest(config.dist.path))
    .pipe(reload({ stream: true }));
});


// ----------------------------------------------------------------------------
// Watch for file changes

gulp.task('watch', ['build', 'browser-sync'], function() {
  // livereload.listen();

  var files = config.src.files.reduce(function(list, cur) {
    return list.concat(typeof cur.src === 'string' ? [cur.src] : cur.src);
  }, []);

  gulp.watch('{src/css/**/*.css,src/scss/**/*.s[ac]ss}',  [ 'styles' ]);
  gulp.watch(config.src.js,                               [ 'scripts' ]);
  gulp.watch(files,                                       [ 'files' ]);

  //reload when a template file, the minified css, or the minified js file changes
  // gulp.watch('templates/**/*.html', 'dist/css/styles.min.css', 'dist/js/main.min.js', function(event) {
  //   gulp.src(event.path)
  //     .pipe($.plumber())
  //     .pipe($.livereload())
  //     .pipe($.notify({
  //       title: 'Gulp',
  //       // icon: notifyInfo.icon,
  //       message: event.path.replace(__dirname, '').replace(/\\/g, '/') + ' was ' + event.type + ' and reloaded'
  //     })
  //   );
  // });
});


// ----------------------------------------------------------------------------

gulp.task('build', ['files', 'scripts', 'styles']);

gulp.task('default', ['watch']);

