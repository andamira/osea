<?php
/**
 * Custom Post Type Single Template
 *
 * The name of this template should reflect the slug of your custom post type.
 *
 * Be aware of 'CTCAT' and 'CTTAG' in the footre entry-meta (two example custom
 * taxonomies for categories and tags, created in /theme/Plugin/taxonomies.php
 *
 * @link http://codex.wordpress.org/Post_Type_Templates
 */
?>

<?php
if ( medula_toolset_layout('') ) { return; }

get_header();
?>

<main role="main">

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?> role="article">

			<header class="entry-header">
				<?php medula_entry_title( 'h1' ); ?>
				<div class="entry-meta"><?php medula_entry_meta_byline(); ?></div>
			</header>

			<section class="entry-content" itemprop="articleBody">
				<?php the_content(); ?>
			</section>

			<footer class="entry-footer">
				<div class="entry-meta"><?php medula_entry_meta_tags('CTTAG'); medula_entry_meta_categories('CTCAT'); ?></div>
			</footer>

			<?php comments_template(); ?>

		</article>

	<?php endwhile; else : ?>

		<?php medula_no_post_found( basename( __FILE__ ) ); ?>

	<?php endif; ?>

</main>

<?php
get_sidebar();
get_footer();
