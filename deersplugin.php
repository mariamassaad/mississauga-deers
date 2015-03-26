<?php
/**
 * Plugin Name: Mississauga Deers Plugin 1
 * Description: A plugin made for the Mississauga Deers
 * Version: 1.0
 * Author: Mariam Assaad, Francis Lam, Jan Uy
 * Liscence: GPL2
 */
 
function load_marquee_scripts(){

wp_register_script('jquery', 'http://code.jquery.com/jquery-1.11.0.min.js');
wp_register_script('marquee_js', plugins_url('/marquee/marquee.js', array(), __FILE__)); 
wp_enqueue_style( 'marquee_css', plugins_url('/marquee/marquee.css', __FILE__));	

		
wp_enqueue_script('jquery');
wp_enqueue_script('marquee_js');
wp_enqueue_style('marquee_css'); 
	
} 

add_action('wp_enqueue_scripts', 'load_marquee_scripts');
  
function create_post_type_marquee() {
	register_post_type('marquee_panel',
		array(
			'labels' => array(
			'name' => __('Marquee'),
			'query_var' => true,
			'hierarchical' => true,
			'singular_name' => __('Panel')
		),
		'public' => true,
		'has_archive' => false,
		'capability_type' => 'post',
		'menu_icon'=> 'dashicons-id-alt',
		'rewrite' => array('slug' => 'learnmore', 'with_front' => false), // Permalinks format
		'supports' => array('title', 'editor')
		)
	);
}
add_action('init','create_post_type_marquee');

function deers_shortcode(){

$marquee_loop = new WP_Query(
	array(
		'post_type' => 'marquee_panel',
		'posts_per_page' => 10,
		'post_status' => 'publish'
	)
);
	

echo '<div class="marquee">';
		echo '<div class="marquee_data">';
			while ( $marquee_loop -> have_posts() ) : $marquee_loop -> the_post();
				$image_id = get_post_thumbnail_id();
				$image_url_full = wp_get_attachment_image_src($image_id,'full');
				$image_url_large = wp_get_attachment_image_src($image_id,'large');
				echo '<div class="marquee_panel" data-image-full="'.$image_url_full[0].'" data-image-large="'.$image_url_large[0].'">';
					echo '<div class="panel_caption">';
						the_title('<h3>','</h3>');
						echo '<div class="panel_content">';
							the_content();
						echo '</div>';
					echo '</div>';
				echo '</div>';
			endwhile;
		echo '</div>';
	echo '</div>';
}

add_shortcode ('deers' , 'deers_shortcode'); 

?>
