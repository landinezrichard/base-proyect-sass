//---------------------------------------------------------------------
// DEPENDENCIAS
//---------------------------------------------------------------------
const { src, dest, watch, series, parallel }= require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

//---------------------------------------------------------------------
//  RUTAS DE LOS ARCHIVOS
//---------------------------------------------------------------------
let paths = {
	css:{
		src  : './src/sass/estilos.scss',
		watch : './src/**/*.scss',
		dest  : 'dist/css/'
	},
	html:{
		src  : './src/index.html',
		watch : './src/*.html',
		dest : './dist'
	},
	js:{
		src  : './src/js/**/*.js',
		dest  : './dist/js/'
	},
	images:{
		src  : './src/assets/img/**/*.+(png|jpg|gif)',
		dest  : './dist/assets/img/'
	},
	server:{
		folder : './dist'
	}
};

//---------------------------------------------------------------------
// TAREA compileSass
//---------------------------------------------------------------------

// Compile sass into CSS
// añade prefijos CSS
// auto-inject into browser
function compileSass(){
	return src(paths.css.src)
		.pipe(sass().on('error', sass.logError) )
		.pipe(prefix('last 2 versions'))
		.pipe(dest(paths.css.dest))
		.pipe(browserSync.stream());
}

//---------------------------------------------------------------------
// TAREA copyHtml
//---------------------------------------------------------------------

function copyHtml(){
	return src(paths.html.watch)
		.pipe(dest(paths.html.dest))
		// .pipe(browserSync.stream());
}

//---------------------------------------------------------------------
// COPIAR JS
//---------------------------------------------------------------------

function copyJs(){
	return src(paths.js.watch)
		.pipe(dest(paths.js.dest))
		.pipe(browserSync.stream());
}

//---------------------------------------------------------------------
// TAREA MINIFICAR Y OPTIMIZAR IMAGENES
//---------------------------------------------------------------------

function optimizeImg(){
	return gulp.src(paths.images.src)
	  .pipe(imagemin([
		gifsicle({interlaced: true}),
		mozjpeg({quality: 75, progressive: true}),
		optipng({optimizationLevel: 5})
	  ]))
	  .pipe(gulp.dest(paths.images.dest));
}

//---------------------------------------------------------------------
// RUN SERVER
//---------------------------------------------------------------------

// Static Server + watching scss/html files
function serve(){
	browserSync.init({
		server: {
			baseDir: paths.server.folder,
			// directory: true
		}
	});
	watch(paths.css.watch, compileSass);
	watch(paths.html.watch).on('change', browserSync.reload);
	watch(paths.js.watch).on('change', browserSync.reload);
}

// Watch - Observar cambios
function watchTask(){
	watch(paths.css.watch, compileSass);
	watch(paths.html.watch, copyHtml);
	watch(paths.js.src, copyJs);
	watch(paths.images.src, optimizeImg);
}

//tarea build
gulp.task('build', gulp.parallel(style, js))

gulp.task('default', gulp.series('build', serve) );


// Exportación de funciones
// al exportar, se pueden ejecutar en consola con: 
// 	gulp nombreFuncion

exports.copyHtml = copyHtml;
exports.compileSass = compileSass;
exports.copyJs = copyJs;
exports.optimizeImg = optimizeImg;

//---------------------------------------------------------------------
// TAREA POR DEFECTO
//---------------------------------------------------------------------

// default gulp

exports.default = series(
	copyHtml,
	compileSass,
	copyJs,
	optimizeImg,
	watchTask
);

// "series" ejecuta una tarea tras otra en orden.
// "parallel" ejecuta las tareas simultaneamente (al mismo tiempo).