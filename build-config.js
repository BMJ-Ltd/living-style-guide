'use strict';

// ----------------------------------------------------------------------------
// Build configuration.

module.exports = {

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
  },

  dist: {
    path: 'dist'
  }

};
