const { src, dest, watch, parallel} = require("gulp");

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {

    src("src/scss/**/*.scss")
        .pipe(plumber())        // Identificar el archivo SASS
        .pipe(sass())               // Compilarlo
        .pipe(dest("build/css"))    // Almacenar en el disco duro

    done(); //Callback que avisa a gulp cuando llegamos al final
}

// Funcion q no modifica png y jpg pero disminuye el peso
function imagenes(done) {
    
    const opciones = {
        optimizationLevel: 3
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin( opciones ) ) )
        .pipe( dest('build/img') )

    done();
}

// Funcion q modifica de png y jpg a webp disminuye bastante el tamaño
function versionWebp( done ) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
    done();
}

// Funcion q cumple lo mismo de la funcion anterior versionWebp
function versionAvif( done ) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )
    done();
}

function javaScript(done) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'))
    done()
}

function dev(done) {
    
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javaScript);
    
    done();
}

exports.css = css;
exports.js = javaScript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javaScript, dev) ;