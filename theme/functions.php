<?php
/**
 * This is the functions.php file.
 *
 *
 *     1 Globals
 *
 *         1.1 Resources URI
 *
 *     2 Theme Functionality
 *
 *         2.1  Core Medula library
 *         2.2  Admin Area
 *         2.3  Head Meta & Link Tags
 *         2.4  Fonts
 *         2.5  Navigation Menus
 *         2.6  Sidebars
 *         2.7  Thumbnails
 *         2.8  Titles
 *         2.9  Entry Meta
 *         2.10 Comments
 *         2.11 Page Links
 *         2.12 No Post Found
 *         2.13 Admin Bar
 *
 *     3 After Setup Theme Actions
 *
 *         3.1 Language Support
 *         3.2 Cleanup
 *         3.3 Load Base Scripts & Styles
 *         3.4 Custom Theme Features
 *         3.5 Register Sidebars
 *
 *     4 External Libraries
 *
 *     5 Custom Functions, Actions & Filters
 *
 *
 * @link http://codex.wordpress.org/Function_Reference/ Don't reinvent the wheel
 */


/**
 * 1 GLOBALS
 * ************************************************************
 */

/**
 * 1.1 Returns the resources URI, with an optional subpath parameter.
 * The default path must match THEME_RESOURCES global in /gulpfile.js
 */
function medula_get_theme_resources_uri( $subpath = '' ){
	return get_template_directory_uri() . '/res/' . $subpath;
}

/**
 * 2 THEME FUNCTIONALITY
 * ************************************************************
 *
 * @link https://github.com/andamira/medula/wiki/Theme_includes
 */

// Core Functions & Libraries
// Enqueue styles & scripts, theme support, cleanup, etc.
require_once( 'lib/medula.php' );

require_once( 'lib/admin.php' );           // Customize WP Admin Area

require_once( 'lib/head-tags.php' );       // Meta Tags, Favicons, etc.
require_once( 'lib/fonts.php' );           // 
require_once( 'lib/navigation.php' );      // 
require_once( 'lib/theme-customize.php' ); // 
require_once( 'lib/sidebars.php' );        // 
require_once( 'lib/thumbnails.php' );      // 
require_once( 'lib/titles.php' );          // 
require_once( 'lib/entry-meta.php' );      // 
require_once( 'lib/comments.php' );        // 
require_once( 'lib/page-links.php' );      // 
require_once( 'lib/no-post-found.php' );   // 
require_once( 'lib/admin-bar.php' );       // 


/**
 * 3 AFTER SETUP THEME
 * ************************************************************
 *
 * Functions defined in /theme/lib/medula.php
 */
function medula_launch() {

	/**
	* 3.1 language support
	*/
	load_theme_textdomain( 'medula', get_template_directory() . '/translations' );

	/**
	* 3.2 cleanup
	*/
	medula_cleanup_all();

	/**
	* 3.3 enqueue base scripts and styles
	*/
	add_action( 'wp_enqueue_scripts', 'medula_scripts_and_styles', 999 );

	/**
	* 3.4 custom theme features
	*/
	medula_theme_support();

	/**
	* 3.5 register sidebars ( sidebars are defined in /theme/lib/sidebars.php )
	*/
	add_action( 'widgets_init', 'medula_register_sidebars' );
}
add_action( 'after_setup_theme', 'medula_launch' );


/**
 * 4 EXTERNAL LIBRARIES & PLUGINS
 * ************************************************************
 *
 * This file controls the inclusion of third party libraries,
 * including fixes & cleanups for external libraries and also
 * for some big plugins like like WPML, Toolset & WooCommerce.
 */
include_once( 'lib/vendor.php' );


/**
 * 5 CUSTOM FUNCTIONS, ACTIONS & FILTERS
 * ************************************************************
 *
 * Here you could put some quick & dirty custom functions, but
 * before doing that it would be better to take a look at the
 * indexed sections above, and try to find a better place.
 *
 */


