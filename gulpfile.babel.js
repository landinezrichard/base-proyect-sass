//---------------------------------------------------------------------
// DEPENDENCIAS
//---------------------------------------------------------------------
import gulp from 'gulp';

//SASS
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

// import prefix from 'gulp-autoprefixer';
// // import imagemin, {gifsicle, mozjpeg, optipng} from 'gulp-imagemin';
// import browserSync from 'browser-sync';
// browserSync.create();

// let imagemin;

// const startup = async () => {
//     // @ts-ignore
//     imagemin = (await import("gulp-imagemin")).default;
// };

// // run this task before any that require imagemin
// gulp.task("startup", async () => {
//     await startup();
// });

//---------------------------------------------------------------------
//  RUTAS DE LOS ARCHIVOS
//---------------------------------------------------------------------
const paths = {
	html:{
		src  : './src/index.html',
		watch : './src/*.html',
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
		src  : './src/assets/img/**/*.+(png|jpg|gif)',
		dest  : './dist/assets/img/'
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
		.pipe(gulp.dest(paths.html.dest))
});

//---------------------------------------------------------------------
// TAREA sass
//---------------------------------------------------------------------

gulp.task('sass', () => {
	return gulp.src(paths.sass.src)
		.pipe(
			sass({
				outputStyle: 'expanded' //Values: nested, expanded, compact, compressed
			}).on('error', sass.logError)
		)
		.pipe(gulp.dest(paths.sass.dest))
});

// export function compileSass(){
// 	return src(paths.css.src)
// 		.pipe(sass().on('error', sass.logError) ) // Compile sass into CSS
// 		.pipe(prefix('last 2 versions')) // añade prefijos CSS
// 		.pipe(dest(paths.css.dest))
// 		.pipe(browserSync.stream()); // auto-inject into browser
// }

//---------------------------------------------------------------------
// COPIAR JS
//---------------------------------------------------------------------

// export function copyJs(){
// 	return src(paths.js.watch)
// 		.pipe(dest(paths.js.dest))
// 		// .pipe(browserSync.stream());
// }

//---------------------------------------------------------------------
// TAREA MINIFICAR Y OPTIMIZAR IMAGENES
//---------------------------------------------------------------------

// export function optimizeImg(){
// 	return gulp.src(paths.images.src)
// 	  .pipe(imagemin([
// 		gifsicle({interlaced: true}),
// 		mozjpeg({quality: 75, progressive: true}),
// 		optipng({optimizationLevel: 5})
// 	  ]))
// 	  .pipe(gulp.dest(paths.images.dest));
// }

//---------------------------------------------------------------------
// RUN SERVER
//---------------------------------------------------------------------

// Static Server
// function serve(){
// 	browserSync.init({
// 		server: {
// 			baseDir: paths.server.folder,
// 			// directory: true
// 		}
// 	});
// 	watch(paths.css.watch, compileSass );
// 	watch(paths.html.watch).on('change', browserSync.reload);
// 	watch(paths.js.watch).on('change', browserSync.reload);
// }

//---------------------------------------------------------------------
// TAREA WATCH
//---------------------------------------------------------------------

// function watchTask(){
// 	watch(paths.css.watch, compileSass);
// 	watch(paths.html.watch, copyHtml);
// 	watch(paths.js.src, copyJs);
// 	watch(paths.images.src, optimizeImg);
// }

//---------------------------------------------------------------------
// TAREA POR DEFECTO
//---------------------------------------------------------------------

gulp.task('default', () => {
	gulp.watch(paths.html.watch, gulp.series('copy-html') );
	gulp.watch(paths.sass.watch, gulp.series('sass') );
	// copyJs,
	// startup,
	// optimizeImg,
	// watchTask,
	// serve
});

// "series" ejecuta una tarea tras otra en orden.
// "parallel" ejecuta las tareas simultaneamente (al mismo tiempo).

// Exportación de funciones
// al exportar, se pueden ejecutar en consola con: 
// 	gulp nombreFuncion