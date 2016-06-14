'use strict';
var gulp = require('gulp'),
    //webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
   // imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify');

var bc = 'bower_components/';

// production section
var homepage_folder = '../../homepage/';
var root = 'prod/';
gulp.task('sass_production', function () {
    gulp.src('app/sass/**/*')
        .pipe(sass())
        .pipe(csso())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(root+'css/'));
});

gulp.task('production_index', function() {
    gulp.src('app/index.html')
        .pipe(gulp.dest(root));
});
gulp.task('production_html', function() {
    gulp.src(['app/**/*.html' , '!app/index.html'])
        .pipe(gulp.dest(root))
});
gulp.task('production_js', function() {
    gulp.src('app/**/*.js')

        .pipe(concat('build.js'))
        .pipe(gulp.dest(root))
});
gulp.task('production_libs', function() {
    gulp.src(bc+'jquery/dist/jquery.js').pipe(gulp.dest(root+'libs/jquery/'));

    gulp.src(bc+'font-awesome/css/*.*').pipe(gulp.dest(root+'libs/font-awesome/css'));

    gulp.src(bc+'font-awesome/fonts/*').pipe(gulp.dest(root+'libs/font-awesome/fonts'));

    gulp.src(bc+'bootstrap/dist/**/*.*').pipe(gulp.dest(root+'libs/bootstrap/'));

    gulp.src(bc+'masonry/dist/*.*').pipe(gulp.dest(root+'libs/masonry/'));
    
    gulp.src(bc+'mixitup/build/*.js').pipe(gulp.dest(root+'libs/mixitup/'));

    gulp.src(bc+'imagesloaded/*.js').pipe(gulp.dest(root+'libs/imagesloaded/'));
    gulp.src([bc+'angular/angular.js',
        bc+'angular-animate/angular-animate.js',
        bc+'angular-cookies/angular-cookies.js',
        bc+'angular-bootstrap/ui-bootstrap-tpls.min.js',
        bc+'angular-loader/angular-loader.js',
//            bc+'angular-resource/angular-resource.js',
        bc+'angular-route/angular-route.js',
        bc+'angular-sanitize/angular-sanitize.js',
//            bc+'angular-touch/angular-touch.js',
//            bc+'firebase/firebase.js',
//            bc+'angularfire/dist/angularfire.js',
    ])
        .pipe(concat('angular.concat.js'))
        .pipe(gulp.dest(root+'libs/angular/'));
});
gulp.task('production', [
    'production_index',
    'sass_production',
    'production_html',
    'production_js',
    'production_libs'
]);
//----------------------------
gulp.task('html', function() {
  gulp.src('app/**/*.html')
    .pipe(gulp.dest('prod/'))
});

gulp.task('sass', function () {
  gulp.src('app/sass/**/*')
      .pipe(sass())
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest('prod/css/'));
});

gulp.task('img', function() {
  gulp.src('img/**/*')
    .pipe(gulp.dest('prod/img/'));
});
gulp.task('app', function() {
    gulp.src('app/**/*.js')
        .pipe(concat('build.js'))
        .pipe(gulp.dest('prod'))
});

gulp.task('libs', function() {
  gulp.src(bc+'jquery/dist/jquery.js').pipe(gulp.dest('prod/libs/jquery/'));

  gulp.src(bc+'font-awesome/css/*.*').pipe(gulp.dest('prod/libs/font-awesome/css'));

  gulp.src(bc+'font-awesome/fonts/*').pipe(gulp.dest('prod/libs/font-awesome/fonts'));

  gulp.src(bc+'bootstrap/dist/**/*.*').pipe(gulp.dest('prod/libs/bootstrap/'));

  gulp.src(bc+'masonry/dist/*.*').pipe(gulp.dest('prod/libs/masonry/'));
    
  gulp.src(bc+'mixitup/build/*.js').pipe(gulp.dest('prod/libs/mixitup/'));

  gulp.src(bc+'imagesloaded/*.js').pipe(gulp.dest('prod/libs/imagesloaded/'));
  gulp.src([bc+'angular/angular.js',
            bc+'angular-animate/angular-animate.js',
            bc+'angular-cookies/angular-cookies.js',
            bc+'angular-bootstrap/ui-bootstrap-tpls.min.js',
            bc+'angular-loader/angular-loader.js',
//            bc+'angular-resource/angular-resource.js',
            bc+'angular-route/angular-route.js',
            bc+'angular-sanitize/angular-sanitize.js',
//            bc+'angular-touch/angular-touch.js',
//            bc+'firebase/firebase.js',
//            bc+'angularfire/dist/angularfire.js',
          ])
      .pipe(concat('angular.concat.js'))
      .pipe(gulp.dest('prod/libs/angular/'));
});
gulp.task('watch', function() {
    gulp.watch('builds/development/app/**/*.js', ['app']);
    gulp.watch('builds/development/sass/**/*.scss', ['sass']);
    gulp.watch('builds/development/**/*.html', ['html']);
    gulp.watch('builds/development/img/**/*', ['img']);
});

gulp.task('default', [
    //'libs',
    'html',
    'img',
//  'js',
    'app',
    'sass'
]);
