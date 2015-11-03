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
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">


	<?php //A check to auto-include some og:tags in your header, depending on what type of template you are on ?>
	
      <?php 
      
	if (is_singular( 'post')) {

      $name = get_the_title(); 
      $post = $wp_query->post;
      $id = $post->ID;
      $p = get_post($id);
      $text = $p->post_content;
      $excerpt_length = apply_filters( 'excerpt_length', 55 );  <?php //adjust excerpt length to what you want ?>
      $text = wp_trim_words( $text, $excerpt_length);
      $imgUrl = wp_get_attachment_thumb_url(get_post_thumbnail_id($id));
      $link = get_permalink(); 
 
      echo '<meta property="og:url" content ="'. $link . '" />
            <meta property="og:title" content="'. $name . '" /> 
            <meta property="og:description" content="'. $text . '" />
            <meta property="og:image" content="' . $imgUrl . '" />
            <meta property="og:type" content="article" />';
    }
    else
    {
      $name = get_bloginfo('name' );
      $description = get_bloginfo('description');
      $imgUrl = get_template_directory_uri();
      $link = "<?php //fill in the url of your website here ?>" ;


      echo '<meta property="og:url" content ="'. $link . '" />
            <meta property="og:title" content="'. $name . '" />
            <meta property="og:description" content="' . $description . '" />
            <meta property="og:image" content="' . $imgUrl . '/library/images/logo-fb.png" />  <?php //this should point to the folder where your images are ?>
            <meta property="og:type" content="website" />';
    }
  ?>
  <meta property="og:image:width" content="250" />
  <meta property="og:image:height" content="250" />



	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	
	<div id="page-wrapper">

		<header class="site-header" role="banner">

			<?php /*
			<a class="mmenu-button" href="#mmenu" >
				<i class="dashicons dashicons-menu"></i>
			</a>
			/**/ ?>

			<?php // to use a image just replace the bloginfo('name') with your img src ?>
			<div class="site-header-logo"><a href="<?php echo home_url(); ?>" rel="nofollow">
				<span class="site-name"><?php bloginfo('name'); ?></span><br />
				<span class="site-description"><?php // bloginfo('description'); ?></span>
			</a></div>

			<div id="site-header-wrapper" class="site-wrapper">

				<nav class="site-main-nav" role="navigation"><?php medula_site_main_nav(); ?></nav>

			</div>

		</header>

		<div id="site-content-wrapper" class="site-wrapper">
