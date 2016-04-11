var gulp = require('gulp');
var del  = require('del');

// JS plugins
var babel  = require('gulp-babel');
var uglify = require('gulp-uglify');

// CSS plugins
var sass    = require('gulp-sass');
var cssNext = require('gulp-cssnext');
var csso    = require('gulp-csso');

// HTML plugins
var haml = require('gulp-ruby-haml');
var pug  = require('gulp-pug');
var htmlMin = require('gulp-htmlmin');

// Images plugins
var imageMin = require('gulp-imagemin');

// Live Reload
var webServer = require('gulp-webserver');


/* gulp とコマンドを打つと実行される */
gulp.task('default', ['copy', 'compile', 'minify', 'server', 'watch'] );

/* watch 系まとめ : gulp watch */
gulp.task('watch', function() {
	gulp.watch(['./source/**/*'], ['copy']);
	gulp.watch(['./source/**/*.pug'],  ['pug']);
	gulp.watch(['./source/**/*.es6'],  ['babel']);
	gulp.watch(['./source/**/*.scss'], ['sass']);
	gulp.watch(['./source/**/*.{gif,jpg,png,svg}'], ['imageMinify']);
	gulp.watch(['./source/**/*.js']   , ['jsMinify']);
	gulp.watch(['./source/**/*.css']  , ['cssMinify']);
	gulp.watch(['./source/**/*.html'] , ['htmlMinify']);
});


/* Live Reload!! */
gulp.task('server', function() {
	gulp.src('./optimized/')
		.pipe(webServer({
			port             : 8013,
			livereload       : true,
			directoryListing : false,
			open             : true
		}));
});

/* COPY : HTML, CSS, JS などでないファイルを optimized にコピー */
gulp.task('copy', function() {
	var ignoreFiles   = '{html,css,js,haml,jade,pug,es6,sass,scss,gif,jpg,png,svg}';
	var ignoreFolders = '{es6,sass,pug,plugins,jade_php}';

	gulp.src(['./source/**/*', '!./source/**/*.'+ignoreFiles, '!./source/'+ignoreFolders])
		.pipe(gulp.dest('./optimized/'));

		// .DS_Store は削除
		del(['./**/.DS_Store']);
});

/* **********
 *  Compile 系 : .html, .css, .js ファイルへ変換
 **********   */
gulp.task('compile', ['babel', 'sass', 'pug']);

/* JS Babel : ES6への対応 */
gulp.task('babel', function() {
	gulp.src('./source/es6/**/*.es6')
		.pipe(babel({
			presets: ['es2015']
		}))
		.on('error', console.error.bind(console))
		.pipe(gulp.dest('./source/'));
});

/* Sass + Scss , and CSS Next */
gulp.task('sass', function() {
	gulp.src(['./source/sass/**/*.{sass,scss}'])
		.pipe(sass().on('error', sass.logError))
		.pipe(cssNext())
		.pipe(gulp.dest('./source/'));
});

/* Pug : Jade の新しい名前。HTML へコンパイル */
gulp.task('pug', function() {
	gulp.src('./source/pug/**/*.pug')
		.pipe(pug({
			pretty : '\t'
		}).on('error', function(e) { console.log(e.message); }))
		.pipe(gulp.dest('./source/'));
});

/* Haml : HTML へコンパイル */
gulp.task('haml', function() {
	gulp.src('./source/haml/**/*.haml')
		.pipe(haml({
			doubleQuote: true,
			encodings  : 'UTF-8'
		}).on('error', function(e) { console.log(e.message); }))
		.pipe(gulp.dest('./source/'));
});

/* HTML Copy : ただコピーしたい場合に使う */
gulp.task('copyHtml', function() {
	gulp.src('./source/**/*.html')
		.pipe(gulp.dest('./optimized/'));
});

/* **********
 *  Minify 系 : ファイルの圧縮
 **********   */
gulp.task('minify', ['jsMinify', 'cssMinify', 'htmlMinify', 'imageMinify']);
gulp.task('codeMinify', ['jsMinify', 'cssMinify', 'htmlMinify']);

/* JavaScript Min */
gulp.task('jsMinify', function() {
	gulp.src('./source/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./optimized/'));
});

/* CSS Min */
gulp.task('cssMinify', function() {
	gulp.src('./source/**/*.css')
		.pipe(csso())
		.pipe(gulp.dest('./optimized/'));
});

/* HTML Min */
gulp.task('htmlMinify', function() {
	gulp.src('./source/**/*.html')
		.pipe(htmlMin({
			removeComments               : true,
			removeCommentsFromCDATA      : true,
			removeCDATASectionsFromCDATA : true,
			collapseWhitespace           : true,
			preserveLineBreaks           : true,
			collapseBooleanAttributes    : true,
			removeTagWhitespace          : true,
			removeAttributeQuotes        : true,
			removeRedundantAttributes    : true,
			preventAttributesEscaping    : true,
			useShortDoctype              : true,
			removeEmptyAttributes        : true
		}))
		.pipe(gulp.dest('./optimized/'));
});

/* ImageMin : 画像圧縮*/
gulp.task('imageMinify', function() {
	gulp.src('./source/**/*.{gif,jpg,png,svg}')
		.pipe(imageMin({
			progressive : true,
			interlaced  : true
		}))
		.pipe(gulp.dest('./optimized/'));
});
