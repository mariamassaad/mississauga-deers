<?php
/**
 * Plugin Name: Mississauga Deers Plugin 1
 * Description: A plugin made for the Mississauga Deers
 * Version: 1.0
 * Author: Mariam Assaad, Francis Lam, Jan Uy
 * License: GPL2
 */

/** The following function is used to load the various scripts and styles used for this plugin */
function load_deersplugin_scripts(){

wp_register_script('jquery', 'http://code.jquery.com/jquery-1.11.0.min.js'); /** Registers the jquery.js from the URL linked */
wp_register_script('deersplugin_js', plugins_url('/deersplugin/deersplugin.js', array(), __FILE__)); /** Registers the custom javascript file created for this plugin */
wp_enqueue_style( 'deersplugin_css', plugins_url('/deersplugin/deersplugin.css', __FILE__)); /** Registers the custom styles file created for this plugin */

		
wp_enqueue_script('jquery'); /** Enqueues the jquery script to load the file to be used */
wp_enqueue_script('deersplugin_js'); /** Enqueues the custom javascript to load the file to be implemented */
wp_enqueue_style('deersplugin_css'); /** Enqueues the custom stylesheet to load the file to be implemented */
	
} 

/** Calls on the function "load_deersplugin_scripts" to activate the styles and scripts to be enqueued and registered */
add_action('wp_enqueue_scripts', 'load_deersplugin_scripts'); 

/**
 *	Custom Post Type Function
 */
 
/** The following function creates the custom post type called Deers Images. */
function create_post_type_deers() {
	register_post_type('deers_image',  /** Registers the post type known as Deers Images by calling on built in post type function. */
		array( /** The following labels in the array will replace basic post labels with labels more relevent to the Deers Images plugin */
			'labels' => array(
			'name' => __('Deers Images'),
			'query_var' => true,
			'hierarchical' => true,
			'singular_name' => 'Deers Image',
			'add_new' => 'Add New',
                	'add_new_item' => 'Add New Deers Image',
                	'edit' => 'Edit',
                	'edit_item' => 'Edit Deers Image',
                	'new_item' => 'New Deers Image',
                	'view' => 'View',
                	'view_item' => 'View Deers Image',
                	'search_items' => 'Search Deers Image',
                	'not_found' => 'No Deers Image found',
                	'not_found_in_trash' => 'No Deers Image found in Trash',
                	'parent' => 'Parent Deers Image'
		),
		'public' => true, 
		'has_archive' => false,
		'capability_type' => 'post',
		'menu_icon'=> 'dashicons-images-alt', /** Sets the menu icon viewable on the dashboard to images-alt dashicon */
		'rewrite' => array('slug' => 'learnmore', 'with_front' => false), // Permalinks format
		'supports' => array('title', 'editor') /** Sets what aspects of the basic post type will be used. In this plugin only title and editor is activated */
		)
	);
}
add_action('init','create_post_type_deers'); /** Calls on the function that creates the custom post type Deers Images and initializes it */

function deers_shortcode(){ /** Creates the function that will create the shortcode that will display the image slider */

$deers_loop = new WP_Query( /** Sets the variable $deers_loop as a WP Query */
	array(	/** Array that contains what post type, how many posts will be looped and which post status will be used for the query */
		'post_type' => 'deers_image',
		'posts_per_page' => 3,
		'post_status' => 'publish'
	)
);
	
/** The following code will create the loop that will display the different deers image post before the javascript will replace these dividers with the slider */
echo '<div class="deers">';
		echo '<div class="deers_data">';
			while ( $deers_loop -> have_posts() ) : $deers_loop -> the_post();
				$image_id = get_post_thumbnail_id();
				$image_url_full = wp_get_attachment_image_src($image_id,'full');
				$image_url_large = wp_get_attachment_image_src($image_id,'large');
				echo '<div class="deers_panel" data-image-full="'.$image_url_full[0].'" data-image-large="'.$image_url_large[0].'">';
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

add_shortcode ('deers' , 'deers_shortcode'); /** Calls on the shortcode function allowing the user to display the code inside the function */

/** Function to create the submenu tab for options */
function register_my_custom_submenu_page() { 
	add_submenu_page( '/edit.php?post_type=deers_image', 'Options', 'Options', 'manage_options', 'options-page', 'my_custom_submenu_page_callback' ); } 

function my_custom_submenu_page_callback() { 
echo '<div class="wrap">
<div id="icon-tools" class="icon32">
</div>'; 

echo '<h2>Options</h2>'; 

echo '<h3>Number of posts</h3>';

/** echo '<textarea class="box">'.$var.'</textarea>'; */

/** $deersPostNumber = $_POST['deersPostNumber'];
print ($deersPostNumber); */


echo '</div>'; } 

add_action('admin_menu', 'register_my_custom_submenu_page'); /** Calls on the function to add the tab on the options */

?>
