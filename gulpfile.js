
var gulp              = require('gulp');
var $                 = require('gulp-load-plugins')({ lazy: true });
var merge             = require('merge-stream');
var streamqueue       = require('streamqueue');
var path              = require('path');


// ----------------------------------------------------------------------------

// Error notification settings for plumber
var plumberErrorHandler = {
  errorHandler: $.notify.onError({
    title: 'Gulp',
    message: "Error: <%= error.message %>"
  })
};


// ----------------------------------------------------------------------------

var config = {
  src: {
    scss: [
      'src/scss/**/!(_)*.scss'
    ],

    css: {
      preSass: [
        'src/vendor/boot/dist/css/bootstrap.css',
        'src/vendor/font-awesome/css/font-awesome.css'
      ],
      postSass: [
        'src/css/**/*.css'
      ]
    },

    js: [
      'src/vendor/jquery/dist/jquery.js',
      'src/vendor/boot/dist/js/bootstrap.js',
      'src/vendor/iCheck/icheck.js',
      'src/vendor/Stepper/jquery.fs.stepper.js',
      'src/vendor/Selecter/jquery.fs.selecter.js',
      'src/js/application.js'
    ],

    files: [
      {
        src: 'src/static/**/*.*',
        base: 'src/static'
      },
      {
        src: 'src/vendor/boot/dist/fonts/*.*',
        base: 'src/vendor/boot/dist'
      },
      {
        src: 'src/vendor/font-awesome/fonts/*.*',
        base: 'src/vendor/font-awesome'
      }
    ]
  }
};


// ----------------------------------------------------------------------------
// Clean all build output

gulp.task('clean', function() {
  return gulp.src('dist', { read: false })
    .pipe($.clean());
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
    .pipe(gulp.dest('dist/css'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.minifyCss())
    .pipe(gulp.dest('dist/css'));
});


// ----------------------------------------------------------------------------
// Scripts

gulp.task('scripts', function() {
  return gulp.src(config.src.js)
    // .pipe($.plumber(plumberErrorHandler))
    .pipe($.concat('site.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe($.uglify())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
});


// ----------------------------------------------------------------------------
// Static files

gulp.task('files', function() {
  var sources = config.src.files.map(function(spec) {
    return gulp.src(spec.src, { base: spec.base });
  });

  return merge(sources)
    .pipe($.newer('dist'))
    .pipe(gulp.dest('dist'));
});


// ----------------------------------------------------------------------------
// Watch for file changes

gulp.task('watch', ['build'], function() {
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

