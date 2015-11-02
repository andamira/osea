// Install dependencies:
//
//         sudo npm install -g bower
//         npm install
//         bower install
//
// Usage:
//
//      type "gulp" for production (minified) stuff
//      type "gulp --dev" for dev stuff
//      type "gulp clean" to delete/clean out your target folders.
//
//      Additional options (TODO):
//
//      --imgmin | --noimgmin     (Don't) minify images
//      --rem2px | --norem2px     (Don't) prefix rem with pixels
//      --cmq | --nocmq           (Don't) combine media queries
//
// INFO:
// See https://github.com/isaacs/minimatch for glob matching syntax info
//
// TODO: jshint, sourcemaps, browserify, livereload...
//


// GLOBAL OPTIONS
// -----------------------------------------------------------
autoprefixer_rules = 'ie >= 8, > 5%, last 3 versions';
remPixelFallback = true;
imageMin = true;
jsMangle = true;


// DEFINE SOURCES AND TARGETS
// ------------------------------------------------------------

var source = {

	// YOUR ASSETS
	// ===========

	sass: [
		'src/sass/**/[^_]*.scss',
	],
	sass_exclude: [ '', ],

	js: [
		'src/js/main.js',
	],
	js_exclude: [ '', ],

	img: ['src/img/**/*.{png,gif,jpg,jpeg,svg,ico}'],
	img_exclude: [ '', ],

	fonts: ['src/fonts/**/*.{woff,woff2,svg,ttf,eof}'],
	fonts_exclude: [ '', ],


	// VENDOR JS & CSS (INTENDED TO BE CONCATENATED AND POSTPROCESSED)
	// =====================================================================
	// (you can also add images and they will be copied to theme/img/vendor)
	//
	// Warning: Order of files is important for concatenation. (TODO)
	//
	// Here you have some suggested plugins. You can install
	// the ones you want. From the root of the project type:
	//
	//     bower install PLUGINNAME --save-dev
	//
	vendor: [
		'vendor-dl/normalize.css/normalize.css',
		'vendor-dl/modernizr/modernizr.custom.js',

		// Recommended Plugins:
		// --------------------

		/// Compatibility / Accesibility
		// 'vendor-dl/picturefill/dist/picturefill.js',           // PictureFill       -

		/// Navigation
		// 'vendor-dl/jQuery.mmenu/dist/core/js/jquery.mmenu.min.all.js',  // MMenu             mmenu.frebsite.nl
		// 'vendor-dl/jQuery.mmenu/dist/core/css/jquery.mmenu.all.css',

		/// Maps
		// 'vendor-dl/leaflet/dist/leaflet.js',                   // Leaflet           leafletjs.com

		/// Tables
		// 'vendor-dl/dynatable/jquery.dynatable.js',             // Dynatable         dynatable.com
		// 'vendor-dl/dynatable/jquery.dynatable.css',

		/// Sliders / Slideshows
		// 'vendor-dl/jquery-cycle2/build/jquery.cycle2.js',      // Cycle2            jquery.malsup.com/cycle2
		
		/// Animations
		// 'vendor-dl/snabbt.js/snabbt.js',                       // Snabbt            daniel-lundin.github.io/snabbt.js
		
		/// Autocomplete
		// 'vendor-dl/awesomeplete/awesomeplete.js',              // Awesomeplete      leaverou.github.io/awesomplete
		// 'vendor-dl/awesomeplete/awesomeplete.css',             // $ bower install LeaVerou/awesomplete#gh-pages --save-dev

		/// Syntax Highlighting
		// 'vendor-dl/prism/prism.js',                            // Prism             prismjs.com
		// 'vendor-dl/prism/themes/prism.css',                    // $ bower install -D prism.git#gh-pages

	],
	vendor_exclude: [ '', ],
	

	// VENDOR JS & CSS (INTENDED TO BE LOADED LIVE FROM WORDPRESS)
	// =====================================================================
	// (you can also add images and they will be copied to theme/img/vendor)
	//
	// They will be (minified and) copied to /theme/[js|css]/vendor/
	// You'll have to load them from WordPress php files, usually like this:
	//
	//     wp_register_script( 'thatvendor-js', get_stylesheet_directory_uri() . '/js/vendor/thatvendor.js', array( 'jquery' ), '', true );
	//
	vendor_live: [
	],
	vendor_live_exclude: [ '', ],

};


var target = {
	css: 'theme/res/css',
	js: 'theme/res/js',
	img: 'theme/res/img',
	fonts: 'theme/res/fonts',

	vendor_live_css: 'theme/res/css/vendor/',
	vendor_live_js: 'theme/res/js/vendor/',
	vendor_img: 'theme/res/img/vendor',
};



// LOAD DEPENDENCIES
// ------------------------------------------------------------

// General
var gulp = require('gulp');
var gutil = require('gulp-util');
var print = require('gulp-print');
var exclude = require('gulp-ignore').exclude;
var addsrc = require('gulp-add-src');
var gulpFilter = require('gulp-filter');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var del = require('del');

// CSS components
var sass = require('gulp-sass')
// var sourcemaps = require('gulp-sourcemaps'); // TODO (can't refer to sass files now bc they are outside theme)
var autoprefixer = require('gulp-autoprefixer');
var pixrem = require('gulp-pixrem');
var minifycss = require('gulp-minify-css');
var cmq = require('gulp-combine-mq');

// JS componentss
var jscs = require('gulp-jscs');
//var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

// Images
var imagemin = require('gulp-imagemin');


// DEFINE TASKS
// ------------------------------------------------------------

// Sass Compilation
// ----------------
gulp.task('compile-sass', function () {

	var filter_frontend_style = gulpFilter( ['main.css', 'src/sass/'], {restore: true} );
	var filter_css = gulpFilter( '**/*.css' );

	return gulp.src(source.sass, { base: '' } )
		.pipe(exclude(source.sass_exclude))

//		.pipe(isProduction ? gutil.noop() : sourcemaps.init() ) // --dev

		// .pipe(print()) // DEBUG

		// Preprocess
		// @link https://www.npmjs.com/package/node-sass#options
		.pipe( sass({
			errLogToConsole: true,
			style: sassStyle,
			precision: 10,
			indentType: 'tab',
			indentWidth: 1,
			sourceComments: false
		})).on( "error", gutil.log)


		// Prepend vendor CSS to frontend style file
		.pipe(filter_frontend_style)
			.pipe(addsrc.prepend(source.vendor)) // add it before your code so it can be overruled
			.pipe(filter_css)
			//.pipe(addsrc.prepend('theme/style.css')) // prepend theme info comment
				// .pipe(print()) // DEBUG
				.pipe(concat('main.css'))
		.pipe(filter_frontend_style.restore)

//		.pipe(isProduction ? gutil.noop() : sourcemaps.write({includeContent: false, sourceRoot: '../sass'})) // --dev

		// Postprocess
//		.pipe(cmq({	log: false })) // NOTE: no sourcemap support
		.pipe(remPixelFallback ? pixrem() : gutil.noop() )
		.pipe(autoprefixer(autoprefixer_rules))

		// Minify
		.pipe(isProduction ? minifycss({
			compatibility: 'ie8',
			keepBreaks: true,
			roundingPrecision: 7,
			keepSpecialComments: 1 // only keep the first one
		}) : gutil.noop())


		.pipe(gulp.dest(target.css))
});


// js Compilation
// --------------
gulp.task('compile-js', function () {

	var filter_js = gulpFilter( '**/*.js', {restore: true} );

	var filter_yourjs = gulpFilter( [ 'main.js', '!vendor-dl/**' ], {restore: true} );
	//var filter_yourjs = gulpFilter( [ '**/*.js', '!vendor-dl/**' ], {restore: true} ); // BUG I can't make this filters work (because of addsrc?)

	// Select the vendor files
	return gulp.src( source.vendor, { base: '' } )
		.pipe(exclude(source.js_exclude))

		// Select only the javascript files
		.pipe(filter_js)

			// Insert your js code after the others
			.pipe(addsrc.append(source.js))
				// .pipe(print()) // DEBUG

			// Detect errors in your code only
			// TODO do this part in a different way (merge? separate streams?)
			.pipe(filter_yourjs)
				//.pipe(print()) // DEBUG
				.pipe(jscs())
			.pipe(filter_yourjs.restore)

			// Concatenate all in this file
			.pipe(concat('scripts.js')).on( "error", gutil.log)

			// Minify
			.pipe(isProduction ? uglify({mangle: jsMangle}).on('error', gutil.log) : gutil.noop())

			// Save output
			.pipe(gulp.dest(target.js))

		.pipe(filter_js.restore)
});


// vendor js & CSS files to load from WordPress
// --------------------------------------------
gulp.task('compile-vendor_live', function () {

	var filter_css = gulpFilter( '**/*.css', {restore: true} );
	var filter_js = gulpFilter( '**/*.js', {restore: true} );

	return gulp.src( source.vendor_live )
		.pipe(exclude(source.vendor_live_exclude))


		// process  JS files
		.pipe(filter_js)

			// Minify
			.pipe(isProduction ? uglify({mangle: jsMangle}).on('error', gutil.log) : gutil.noop())

			// Save output
			.pipe(gulp.dest(target.vendor_live_js))
		.pipe(filter_js.restore)


		// process CSS files
		.pipe(filter_css)

			// .pipe(print()) // DEBUG

			// Postprocess
			.pipe(remPixelFallback ? pixrem() : gutil.noop() )
			.pipe(autoprefixer(autoprefixer_rules))

			// Minify
			.pipe(isProduction ? minifycss({
				compatibility: 'ie8',
				keepBreaks: true,
				roundingPrecision: 10,
				keepSpecialComments: 0
			}) : gutil.noop())

			// Save output
			.pipe(gulp.dest(target.vendor_live_css))

		.pipe(filter_css.restore)
});


// COPY FONTS
// ----------
gulp.task('fonts', function(){
	return gulp.src(source.fonts)
		.pipe(exclude(source.fonts_exclude))

		.pipe(flatten())
		.pipe(gulp.dest(target.fonts));
});


// PROCESS AND COPY IMAGES
// -----------------------
// TODO: compress
gulp.task('images', function(){

	// Images
    return gulp.src(source.img)
		.pipe(exclude(source.images_exclude))
		.pipe(imageMin ? imagemin() : gutil.noop() ) // --no-imgmin
		.pipe(flatten())
		.pipe(gulp.dest(target.img));


	// Vendor images
	
	var filter_img = gulpFilter( '*.{png,gif,jpg,jpeg,svg,ico}' );

    return gulp.src(source.vendor)
		.pipe(addsrc.append(source.vendor_live))
		.pipe(exclude(source.vendor_live_exclude))
		.pipe(filter_img)
			.pipe(imageMin ? imagemin() : gutil.noop() ) // --no-imgmin
			.pipe(flatten())
			.pipe(gulp.dest(target.vendor_img));
});



// CLEAN COMPILATION
gulp.task('clean', function(cb) {
	del([target.css, target.js, target.img, target.fonts], cb)
});



// DEFINE ENVIRONMENT & DEFAULT TASK
// ------------------------------------------------------------

var isProduction = true;             // gulp
var sassStyle = 'nested';


// CLI options
// -----------
if(gutil.env.dev === true) {         // --dev
	isProduction = false;
	imageMin = false;
	var sassStyle = 'compressed';
}
if(gutil.env.noimgmin === true) {   // --noimgmin
	imageMin = false;
}
if(gutil.env.norem2px === true) {   // --norem2px
	remPixelFallback = false;
}


gulp.task( 'default',
	[ 'compile-sass', 'compile-js', 'compile-vendor_live', 'fonts', 'images' ]
);

