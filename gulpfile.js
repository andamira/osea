/**
 * Gulp Configuration File
 *
 * Usage:
 *
 *      type: `gulp --dev` while developing stuff
 *      type: `gulp` for production (minified) stuff
 *      type: `gulp clean` to delete out your target res/ folders
 *
 *      Additional options:
 *
 *      --imgmin | --noimgmin     (Don't) minify images
 *      --rem2px | --norem2px     (Don't) prefix rem with pixels
 *      --cmq | --nocmq           (Don't) combine media queries
 *
 *
 * Index:
 *
 *     1 Global Options
 *
 *         1.1 Resources Paths
 *         1.2 Gulp Defaults
 *
 *     2 Define Sources
 *
 *         2.1 Your Own Assets
 *         2.2 Vendor CSS & JS (concat)
 *         2.2 Vendor CSS & JS (live)
 *         2.4 Suggested Plugins
 *
 *     3 Define Targets
 *
 *     4 Load Gulp Dependencies
 *
 *     5 Define Subtasks
 *
 *         5.1 Minify CSS
 *         5.2 Process Images
 *
 *     6 Define Tasks
 *
 *         6.1 Sass Compilation
 *         6.2 JS Compilation
 *         6.3 Live vendor CSS & JS
 *         6.4 Process Images
 *         6.5 Process Fonts
 *         6.6 Clean
 *
 *     7 Configure Environment
 *
 *         7.1 Default Options
 *         7.1 CLI Parameters
 *         7.3 Default Task
 *
 *
 * Links:
 *
 * @link https://github.com/isaacs/minimatch Syntax for Glob Matching 
 *
 */


/**
 * 1 GLOBAL OPTIONS
 * -----------------------------------------------------------
 */

/**
 * 1.1 Resources Paths
 */

var ORIG_RESOURCES   = "src/";
var THEME_RESOURCES  = "theme/res/";  // must match medula_get_theme_resources_uri() in theme/functions.php
var PLUGIN_RESOURCES = "plugin/res/"; //
var BOWER_DIR        = "vendor-dl/";  // must match directory in .bowerrc

/**
 * 1.2 Gulp Defaults
 */

var DEBUG_LVL          = 0; // 0 = none | 1 = print files going through tasks pipes | 2 = also for subtasks

var AUTOPREFIXER_RULES = 'ie >= 9, > 5%, last 3 versions'; // https://github.com/ai/browserslist#queries

var DO_REMPIXEL        = false; // rem to pixel fallback
var DO_IMAGEMIN        = true;  // image minification
var DO_JSMANGLE        = true;  // javascript uglification


/**
 * 2 DEFINE SOURCES
 * ------------------------------------------------------------
 */

var source = {

	/**
	 * 2.1 YOUR OWN ASSETS
	 * -------------------
	 */

	sass: [
		ORIG_RESOURCES + 'sass/**/[^_]*.scss',
	],
	sass_exclude: [ '', ],

	js: [
		ORIG_RESOURCES + 'js/main.js',
	],
	js_exclude: [ '', ],

	img: [
		ORIG_RESOURCES + 'img/**/*.{png,gif,jpg,jpeg,svg,ico}'
	],
	img_exclude: [ '', ],

	fonts: [
		ORIG_RESOURCES + 'fonts/**/*.{woff,woff2,svg,ttf,eof}'
	],
	fonts_exclude: [ '', ],


	/**
	 * 2.2 VENDOR JS & CSS (CONCAT)
	 * ----------------------------
	 *
	 * List of vendor files intented to be concatenated into the theme main.css
	 * and main.js, and then postprocessed. The order matters for concatenation.
	 *
	 * Note: they are included _before_ the custom styles and scripts.
	 *
	 */
	vendor: [
		BOWER_DIR + 'normalize.css/normalize.css',           // Normalize         necolas.github.io/normalize.css/
		BOWER_DIR + 'modernizr/modernizr.custom.js',         // Modernizr         modernizr.com
	],
	vendor_exclude: [ '', ],
	

	/**
	 * 2.3 VENDOR JS & CSS (LIVE)
	 * --------------------------
	 *
	 * List of vendor files intented to be (minified and) copied to the theme and plugin
	 * vendor folders, and later loaded from the php templates;
	 *
	 * Note: You'll have to load them from the theme like this:
	 *
	 *     wp_register_script( 'thatvendor-js', get_stylesheet_directory_uri() . '/res/js/vendor/thatvendor.js', array(), '', true );
	 *
	 * or load them from the plugin like this:
	 *
	 *     wp_register_script( 'thatvendor-js', plugins_url('/res/js/vendor/thatvendor.js'), array(), '', true );
	 */
	vendor_live: [
	],
	vendor_live_exclude: [ '', ],
	

	/**
	 * 2.4 LIST OF SUGGESTED PLUGINS FOR COMMON NEEDS
	 * ----------------------------------------------
	 *
	 * This is a list of recommended vendor plugins and libraries.
	 * Install the ones you want from the root folder, like this:
	 *
	 *     bower install PLUGIN_NAME --save-dev
	 *
	 * (or use the custom bower install command when specified).
	 * After that, copy the line to the appropiate section above.
	 *
 	 * @link https://github.com/sorrycc/awesome-javascript/ Collection of js libraries
	 */

	/* NEED                                                  PLUGIN_NAME        WEBSITE
	 * --------------------------------------------------------------------------------

	// Compatibility / Accesibility
	BOWER_DIR + 'picturefill/dist/picturefill.js',           // PictureFill       -

	// Navigation
	BOWER_DIR + 'jQuery.mmenu/dist/core/js/jquery.mmenu.min.all.js',  // MMenu    mmenu.frebsite.nl
	BOWER_DIR + 'jQuery.mmenu/dist/core/css/jquery.mmenu.all.css',

	// Maps
	BOWER_DIR + 'leaflet/dist/leaflet.js',                   // Leaflet           leafletjs.com

	// Tables
	BOWER_DIR + 'dynatable/jquery.dynatable.js',             // Dynatable         dynatable.com
	BOWER_DIR + '/dynatable/jquery.dynatable.css',

	// Sliders / Slideshows
	BOWER_DIR + 'jquery-cycle2/build/jquery.cycle2.js',      // Cycle2            jquery.malsup.com/cycle2
	
	// Animations
	BOWER_DIR + 'snabbt.js/snabbt.js',                       // Snabbt            daniel-lundin.github.io/snabbt.js
	
	// Autocomplete
	BOWER_DIR + 'awesomeplete/awesomeplete.js',              // Awesomeplete      leaverou.github.io/awesomplete
	BOWER_DIR + 'awesomeplete/awesomeplete.css',             // $ bower install LeaVerou/awesomplete#gh-pages --save-dev

	// Syntax Highlighting
	BOWER_DIR + 'prism/prism.js',                            // Prism             prismjs.com
	BOWER_DIR + 'prism/themes/prism.css',                    // $ bower install -D prism.git#gh-pages

	--- */
};


/**
 * 3 DEFINE TARGET FOLDERS
 * ------------------------------------------------------------
 */

var target = {
	css:             THEME_RESOURCES + 'css',
	js:              THEME_RESOURCES + 'js',
	img:             THEME_RESOURCES + 'img',
	fonts:           THEME_RESOURCES + 'fonts',

	vendor_live_css: THEME_RESOURCES + 'css/vendor',
	vendor_live_js:  THEME_RESOURCES + 'js/vendor',
	vendor_img:      THEME_RESOURCES + 'img/vendor',
};


/**
 * 4 LOAD GULP DEPENDENCIES
 * ------------------------------------------------------------
 *
 * Don't use plugins on the blacklist:
 * @link https://github.com/gulpjs/plugins/blob/master/src/blackList.json
 */

// General
var gulp = require('gulp');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var exclude = require('gulp-ignore').exclude;
var addsrc = require('gulp-add-src');
var gulpFilter = require('gulp-filter');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var del = require('del');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');

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


/**
 * 5 DEFINE SUB-TASKS
 * ------------------------------------------------------------
 */

/**
 * 5.1 MINIFY CSS
 */
var subtask_minifycss = lazypipe()

	.pipe(function () {
		return gulpif( DEBUG_LVL > 1, debug({title: ' » minifycss:'}) );
	})

	.pipe( minifycss, {
		keepBreaks: true,     // defaults to false
		roundingPrecision: 7, // defaults to 2

		// https://github.com/jakubpawlowicz/clean-css#how-to-set-a-compatibility-mode
		compatibility: '*',

		// * for keeping all (default), 1 for keeping first one only, 0 for removing all
		keepSpecialComments: 0
	});

/**
 * 5.2 PROCESS IMAGES
 */
var subtask_process_images = lazypipe()

	.pipe(function () {
		return gulpif( DEBUG_LVL > 1, debug({title: ' » images:'}) );
	})

	.pipe(imagemin)

	.pipe(flatten)
	;


/**
 * 6 DEFINE TASKS
 * ------------------------------------------------------------
 */

/**
 * 6.1 SASS COMPILATION
 * --------------------
 */

gulp.task('compile-sass', function () {

	var filter_frontend_style = gulpFilter( ['main.css', 'src/sass/'], {restore: true} );
	var filter_css = gulpFilter( '**/*.css' );

	return gulp.src(source.sass, { base: '' } )
		.pipe(exclude(source.sass_exclude))

//		.pipe(IS_PRODUCTION ? gutil.noop() : sourcemaps.init() ) // --dev

		.pipe( gulpif( DEBUG_LVL > 0, debug({title: '> compile-sass:'}) ) )

		// Preprocess
		// @link https://www.npmjs.com/package/node-sass#options
		.pipe( sass({
			errLogToConsole: true,
			style: SASS_STYLE,
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
				.pipe(concat('main.css'))
		.pipe(filter_frontend_style.restore)

//		.pipe(IS_PRODUCTION ? gutil.noop() : sourcemaps.write({includeContent: false, sourceRoot: '../sass'})) // --dev

		// Postprocess
//		.pipe(cmq({	log: false })) // NOTE: no sourcemap support
		.pipe(DO_REMPIXEL ? pixrem() : gutil.noop() )
		.pipe(autoprefixer(AUTOPREFIXER_RULES))

		// Minify
		.pipe( gulpif( IS_PRODUCTION, subtask_minifycss() ) )

		.pipe(gulp.dest(target.css))
});


/**
 * 6.2 JS COMPILATION
 * ------------------
 */

gulp.task('compile-js', function () {

	var filter_js = gulpFilter( '**/*.js', {restore: true} );

	var filter_yourjs = gulpFilter( [ 'main.js', '!vendor-dl/**' ], {restore: true} );
	//var filter_yourjs = gulpFilter( [ '**/*.js', '!vendor-dl/**' ], {restore: true} ); // BUG I can't make this filters work (because of addsrc?)

	// Select the vendor files
	return gulp.src( source.vendor, { base: '' } )
		.pipe(exclude(source.js_exclude))

		// Select only the javascript files
		.pipe(filter_js)

			// Insert your JS code after the others
			.pipe(addsrc.append(source.js))

			// Detect errors in your code only
			// TODO do this part in a different way (merge? separate streams?)
			.pipe(filter_yourjs)
				.pipe(jscs())
			.pipe(filter_yourjs.restore)

			.pipe( gulpif( DEBUG_LVL > 0, debug({title: '> compile-js:'}) ) )

			// Concatenate all in this file
			.pipe(concat('main.js')).on( "error", gutil.log)

			// Minify
			.pipe(IS_PRODUCTION ? uglify({mangle: DO_JSMANGLE}).on('error', gutil.log) : gutil.noop())

			// Save output
			.pipe(gulp.dest(target.js))

		.pipe(filter_js.restore)
});


/**
 * 6.3 LIVE VENDOR JS & CSS COMPILATION
 * ------------------------------------
 */

gulp.task('compile-vendor_live', function () {

	var filter_css = gulpFilter( '**/*.css', {restore: true} );
	var filter_js = gulpFilter( '**/*.js', {restore: true} );

	return gulp.src( source.vendor_live )
		.pipe(exclude(source.vendor_live_exclude))


		// process  JS files
		.pipe(filter_js)

			// Minify
			.pipe(IS_PRODUCTION ? uglify({mangle: DO_JSMANGLE}).on('error', gutil.log) : gutil.noop())

			// Save output
			.pipe(gulp.dest(target.vendor_live_js))
		.pipe(filter_js.restore)


		// process CSS files
		.pipe(filter_css)

			.pipe( gulpif( DEBUG_LVL > 0, debug({title: '> compile-vendor-live:'}) ) )

			// Postprocess
			.pipe(DO_REMPIXEL ? pixrem() : gutil.noop() )
			.pipe(autoprefixer(AUTOPREFIXER_RULES))

			// Minify
			.pipe( gulpif( IS_PRODUCTION, subtask_minifycss() ) )

			// Save output
			.pipe(gulp.dest(target.vendor_live_css))

		.pipe(filter_css.restore)
});


/**
 * 6.4 PROCESS IMAGES
 * ------------------
 */

gulp.task('images', function(){

	var filter_img = gulpFilter( '*.{png,gif,jpg,jpeg,svg,ico}' );

	// Images
    return gulp.src(source.img)
		.pipe(exclude(source.images_exclude))

		.pipe( gulpif( DO_IMAGEMIN, subtask_process_images() ) )

		.pipe(gulp.dest(target.img));


	// Vendor images
    return gulp.src(source.vendor)
		.pipe(addsrc.append(source.vendor_live))
		.pipe(exclude(source.vendor_live_exclude))
		.pipe(filter_img)

		.pipe( gulpif( DO_IMAGEMIN, subtask_process_images() ) )

		.pipe(gulp.dest(target.vendor_img));
});


/**
 * 6.5 PROCESS FONTS
 * -----------------
 */

gulp.task('fonts', function(){
	return gulp.src(source.fonts)
		.pipe(exclude(source.fonts_exclude))

		.pipe( gulpif( DEBUG_LVL > 0, debug({title: '> fonts:'}) ) )

		.pipe(flatten())
		.pipe(gulp.dest(target.fonts));
});


/**
 * 6.6 CLEAN PREVIOUSLY COMPILED RESOURCES
 * ------------------------------------------------------------
 */
gulp.task('clean', function(cb) {

	// Delete individual resources folders:
	del([
		target.css,
		target.js,
		target.img,
		target.fonts
	], cb)

	// Delete the whole resources folder:
	del(THEME_RESOURCES, cb)

});


/**
 * 7 ENVIRONMENT, OPTIONS & DEFAULT TASK
 * ------------------------------------------------------------
 */

/**
 * 7.1 DEFAULT OPTIONS
 */

var IS_PRODUCTION = true;             // gulp
var SASS_STYLE = 'nested';


/**
 * 7.2 CLI PARAMETERS
 */

if(gutil.env.dev === true) {         // --dev
	IS_PRODUCTION = false;
	DO_IMAGEMIN   = false;
	SASS_STYLE = 'compressed';
}
if(gutil.env.noimgmin === true) {   // --noimgmin
	DO_IMAGEMIN = false;
}
if(gutil.env.norem2px === true) {   // --norem2px
	DO_REMPIXEL = false;
}


/**
 * 7.3 DEFAULT TASK (PRODUCTION)
 */

gulp.task( 'default',
	[ 'compile-sass', 'compile-js', 'compile-vendor_live', 'fonts', 'images' ]
);

// Default task prepared for future Gulp 4.0
gulp.task( 'default-4',
	gulp.series( 'clean',
		gulp.parallel( 'compile-sass', 'compile-js', 'compile-vendor_live', 'fonts', 'images' ),
		function() {
		}
	)
);

