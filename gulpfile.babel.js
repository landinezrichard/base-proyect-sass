//---------------------------------------------------------------------
// DEPENDENCIAS
//---------------------------------------------------------------------
import gulp from 'gulp';

//SASS
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

//CSS
import prefixer from 'gulp-autoprefixer';

//Optimización imágenes
import imagemin from 'gulp-imagemin';

//Browser sync
import { init as server, stream, reload } from 'browser-sync';

//Plumber
import plumber from 'gulp-plumber';

//PUG
// import pug from "gulp-pug";

//---------------------------------------------------------------------
//  RUTAS DE LOS ARCHIVOS
//---------------------------------------------------------------------
const paths = {
	html:{
		src  : './src/index.html',
		watch : './src/*.html',
		dest : './dist'
	},
	views:{
		src: './src/views/*.pug',
		watch : './src/views/**/*.pug',
		dest : './dist'
	},
	sass:{
		src  : './src/sass/estilos.scss',
		watch : './src/sass/**/*.scss',
		dest  : './dist/css'
	},
	js:{
		src  : './src/js/**/*.js',
		dest  : './dist/js/'
	},
	images:{
		// src  : './src/assets/img/**/*.+(png|jpg|gif)',
		src: './src/assets/img/**/*', //así toma cualquier extensión de imagen
		dest  : './dist/assets/img/'
	},
	fonts:{
		src : [
			'src/assets/fonts/**/*.eot',
			'src/assets/fonts/**/*.svg',
			'src/assets/fonts/**/*.ttf',
			'src/assets/fonts/**/*.woff'
		],
		dest  : './dist/assets/fonts/'
	},
	server:{
		folder : './dist'
	}
};

//---------------------------------------------------------------------
// TAREA copy-html
//---------------------------------------------------------------------

gulp.task('copy-html', () => {
	return gulp.src(paths.html.watch)
		.pipe(plumber())
		.pipe(gulp.dest(paths.html.dest))
});

//---------------------------------------------------------------------
// TAREA vistas PUG
//---------------------------------------------------------------------

gulp.task('vistas', () =>{
	return gulp.src(paths.views.src)
		.pipe(plumber())
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(paths.views.dest))
		.pipe(stream());
});

//---------------------------------------------------------------------
// TAREA SASS
//---------------------------------------------------------------------

gulp.task('sass', () => {
	return gulp.src(paths.sass.src)
		.pipe(plumber())
		.pipe(
			sass({
				outputStyle: 'expanded' //Values: nested, expanded, compact, compressed
			}).on('error', sass.logError)
		)
		.pipe(prefixer('last 2 versions')) // añade prefijos CSS
		.pipe(gulp.dest(paths.sass.dest))
		.pipe(stream()); //auto-inyectar al navegador
});

//---------------------------------------------------------------------
// TAREA MINIFICAR Y OPTIMIZAR IMAGENES
//---------------------------------------------------------------------

gulp.task('img-min', () => {
	return gulp.src(paths.images.src)
		.pipe(plumber())
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.mozjpeg({quality: 75, progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{
						name: 'removeViewBox',
						active: true
					},
					{
						name: 'cleanupIDs',
						active: false
					}
				]
			})
		]))
		.pipe(gulp.dest(paths.images.dest));
});

//---------------------------------------------------------------------
// COPIAR JS
//---------------------------------------------------------------------

gulp.task('copy-js', () => {
	return gulp.src(paths.js.src)
		.pipe(plumber())
		.pipe(gulp.dest(paths.js.dest))
});

//---------------------------------------------------------------------
// TAREA COPIAR FUENTES
//---------------------------------------------------------------------
gulp.task('copy-fonts', () => {
	return gulp.src(paths.fonts.src)
		.pipe(plumber())
		.pipe(gulp.dest(paths.fonts.dest))
});

//---------------------------------------------------------------------
// TAREA POR DEFECTO
//---------------------------------------------------------------------

gulp.task('default', () => {
	// RUN STATIC SERVER
	server({
		server: {
			baseDir: paths.server.folder,
		}
	});
	//  WATCH + RELOAD BROWSER
	gulp.watch(paths.html.watch, gulp.series('copy-html') ).on('change', reload);
	// gulp-watch(paths.views.watch, gulp.series('vistas') ).on('change', reload);
	gulp.watch(paths.sass.watch, gulp.series('sass') );
	gulp.watch(paths.js.src, gulp.series('copy-js') ).on('change', reload);
});

// "series" ejecuta una tarea tras otra en orden.
// "parallel" ejecuta las tareas simultaneamente (al mismo tiempo).