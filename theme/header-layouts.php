<?php
/**
 * Header template
 * 
 * @link http://codex.wordpress.org/Function_Reference/get_header
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<?php // META THEME COLOR {@link https://github.com/whatwg/meta-theme-color} ?>
	<meta name="theme-color" content="#ffffff">

	<?php // mobile meta ?>
	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, initial-scale=1"/>

	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

	<?php
		do_action( 'wpbootstrap_before_wp_head' );
		wp_head();
		do_action( 'wpbootstrap_after_wp_head' );
	?>
</head>

<body <?php body_class('toolset-layouts'); ?>>

	<?php do_action( 'wpbootstrap_before_header' ); ?>
	<header class="site-header" role="banner">
		<nav class="site-main-nav" role="navigation"><?php medula_site_main_nav(); ?></nav>
	</header>
	<?php do_action( 'wpbootstrap_after_header' ); ?>

	<div class="layouts-containers"> <?php // container of layouts containers ?>
