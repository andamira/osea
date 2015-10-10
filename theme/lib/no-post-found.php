<?php
/**
 * Not Found template
 *
 */

function medula_no_post_found( $template ) {
?>
	<article id="post-not-found" class="hentry">
		<header class="entry-header">
			<h1><?php _e( 'Post Not Found!', 'medula-theme' ); ?></h1>
		</header>
		<section class="entry-content">
			<p><?php _e( 'Something is missing. Try double checking things.', 'medula-theme' ); ?></p>
		</section>
		<footer class="entry-footer">
			<p class="alert-error"><?php printf( __( 'This is the error message in the %1$s template.', 'medula-theme' ), $template ); ?></p>
		</footer>
	</article>
<?php
}
