var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var foal = require('gulp-foal')();
var babel = require('gulp-babel');
var cleanCSS = require('gulp-clean-css');

gulp.task('minicss', () => {
    return gulp.src('./app/public/css/*/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('./app/public/style'));
});
gulp.task('blogList', function () {
    return browserify({
        basedir: '.',
        debug: false,
        entries: ['./app/build/blogList.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .transform('babelify', {
        presets: ['env'],
        extensions: ['.ts']
    })
    .bundle()
    .pipe(source('blogList.js'))
    .pipe(gulp.dest('./app/public/build'));
});
gulp.task('tagList', function () {
  return browserify({
      basedir: '.',
      debug: true,
      entries: ['./app/build/tagList.ts'],
      cache: {},
      packageCache: {}
  })
  .plugin(tsify)
  .transform('babelify', {
      presets: ['env'],
      extensions: ['.ts']
  })
  .bundle()
  .pipe(source('tagList.js'))
  .pipe(buffer())
  .pipe(babel())
  .pipe(uglify())
  .pipe(gulp.dest('./app/public/build'));
});
gulp.task('default',['blogList', 'tagList'])

foal.task('typeBabel',function(fileName, outFileName){
  console.log(fileName, outFileName)
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['./app/build/'+fileName],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .transform('babelify', {
      presets: ['env'],
      extensions: ['.ts']
  })
  .bundle()
  .pipe(source(outFileName+'.js'))
  .pipe(gulp.dest('./app/public/build'));
})

gulp.task('watch',function(cb){
  gulp.watch('./app/build/*.ts', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    var arr = event.path.split('/')
    var fileName = arr[arr.length-1]
    var outFileName = fileName.split('.')[0]
    foal.run(foal.typeBabel(fileName, outFileName),cb)
  });
})