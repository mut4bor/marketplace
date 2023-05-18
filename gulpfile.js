const { src, dest, series, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()

function html() {
  return src('src/html/**.html')
    .pipe(include({
      prefix: '@@'
    }))
    .pipe(htmlmin({
      collapseWhitespace: false
    }))
    .pipe(dest('dist'))
}

function scss() {
  return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(csso())
    .pipe(dest('dist'));
}

function javascript() {
  return src('src/**.js')
    .pipe(dest('dist'));
}

function plugins() {
  return src('src/plugins/**/*.*')
    .pipe(dest('dist/plugins'));
}

function img() {
  return src('src/img/**/*.*')
    .pipe(dest('dist/img'));
}

function fonts() {
  return src('src/fonts/**/*.*')
    .pipe(dest('dist/fonts'));
}

function clear() {
  return del('dist')
}

function serve() {
  sync.init({
    server: './dist'
  })

  watch('src/html/**/*.*', series(html)).on('change', sync.reload)
  watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
  watch('src/**.js', series(javascript)).on('change', sync.reload)

}

exports.s = series(clear, scss, html, javascript, plugins, img, fonts, serve)
exports.c = clear