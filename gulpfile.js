var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var foal = require('gulp-foal')();

gulp.task('blogList', function () {
    return browserify({
        basedir: '.',
        debug: true,
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
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/public/js'));
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
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./app/public/js'));
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
  .pipe(gulp.dest('./app/public/js'));
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