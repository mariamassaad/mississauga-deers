var deersVars = {
	screenSize : '',
	width : 0,
	mobileSize : 600,
	autoPlay : true,
	currentPanel : 1,
	totalPanels : 0,
	timePassed : 0,
	timeToChange : 50,
	inTansition : false,
	panelContent : Array
}

function deersAdvance(){

	// check browser width
	var browserWidth = jQuery('.deers').width();
	var currentSize = deersVars.screenSize;
	if(browserWidth > deersVars.mobileSize){
		var newWidth = 'large';
		deersVars.screenSize = 'large';
	}else{
		var newWidth = 'small'
		deersVars.screenSize = 'small';
	}
	
	// detect change in screen size variable
	if(currentSize != newWidth){
		if(deersVars.screenSize == 'large'){
			deersMultiPanel();
		}else{
			deersSinglePanel();
		}
	}
	
	// advance the timer and large deers
	if (deersVars.timePassed == deersVars.timeToChange){
		deersVars.timePassed = 0;
		if (deersVars.autoPlay == true){
			if(deersVars.currentPanel == deersVars.totalPanels){
				jQuery('.deers_nav div:nth-child(1)').trigger('click');
			}else{
				jQuery('.deers_nav div:nth-child('+(deersVars.currentPanel+1)+')').trigger('click');
			}
		}
	}else{
		deersVars.timePassed += 1;
	}
	setDebuger();
}


jQuery(document).ready(function(){

	deersGatherData();
	deersMeasureScreen();
	setDebuger();
	});

function deersMultiPanel(){

	deersVars.timePassed = 0;
	deersVars.autoPlay = true;

	// clear HTML from deers and add stage elements
	jQuery('.deers').html('').append('<div class="deers_stage_large"></div>');
	jQuery('.deers_stage_large').append('<div class="deers_container_1"></div><div class="deers_nav"></div>');
	
	// Generate navigation and links
	for(i=0; i<deersVars.totalPanels; i++){
		jQuery('.deers_nav').append('<div></div>');
	}
	
	// Detect hover over deers
	jQuery('.deers').hover(
		function(){
			deersVars.autoPlay = false;
			jQuery(this).removeClass('autoplay');
		},
		function(){
			deersVars.autoPlay = true;
			deersVars.timePassed = 0;
			jQuery(this).addClass('autoplay');
		}
	);
	
	jQuery('.deers_nav div').on('click', function(){

		var navClicked = jQuery(this).index();

		if(deersVars.inTansition){
			//do nothing
		}else{

			deersVars.currentPanel = navClicked + 1;
			deersVars.inTansition = true;
			
			// set the navigation state
			jQuery('.deers_nav div').removeClass('selected');
			jQuery(this).addClass('selected');
	
			// inject panel container
			jQuery('.deers_stage_large').append('<div class="deers_container_2" style="opacity:0;"></div>');
			
			jQuery('.deers_container_2').html(deersVars.panelContent[navClicked]).animate({opacity:1},500,function(){
			jQuery('.deers_container_1').remove();
			jQuery(this).addClass('deers_container_1').removeClass('deers_container_2');
			deersVars.inTansition = false;
			setDebuger(); 
			
			});
 
		}

		setDebuger();

	});
	
	// auto click first nav element
	jQuery('.deers_nav div:first').trigger('click');

}

function deersSinglePanel(){

	// clear HTML from deers and add stage small
	jQuery('.deers').html('').append('<div class="deers_stage_small">'+deersVars.panelContent[0]+'</div>');
	
	var getLink = jQuery('.deers .deers_stage_small').find('a:nth-child(1)').attr('href');  /* grab first hyperlink url, add hyperlink to title */
	var getTitle = jQuery('.deers .deers_stage_small h3').html();
	var getFullImage = jQuery('.deers .deers_stage_small .deers_panel').attr('data-full');
	jQuery('.deers .deers_stage_small h3').html('<a href="'+getLink+'">'+getTitle+'</a>');
	jQuery('.deers .deers_stage_small .deers_panel').css('background-image','url('+getFullImage+')');  /* replace background-image with smalle file */
	
	setDebuger();
}

function deersMeasureScreen(){
	// measure screen size
	if(jQuery('.deers').width() > 600 ){
		deersVars.screenSize = 'large';
		deersMultiPanel();
	}else{
		deersVars.screenSize = 'small';
	}
}

function deersGatherData(){
// create and store HTML for panels
jQuery('.deers_data .deers_panel').each(function(index){

	deersVars.totalPanels = index + 1;

	var imageFull = jQuery(this).attr('data-image-full');
	var imageLarge = jQuery(this).attr('data-image-large');
	var panelCaption = jQuery(this).find('.panel_caption').html();

	deersVars.panelContent[index] = '<div class="deers_panel" style="background-image:url('+imageFull+');" data-full="'+imageLarge+'"><div class="panel_caption">'+panelCaption+'</div></div>';

});

setInterval (deersAdvance, 100);
	
}

function setDebuger(){
	jQuery('.screenSize').html('deersVars.screenSize = '+deersVars.screenSize);
	jQuery('.autoPlay').html('deersVars.autoPlay = '+deersVars.autoPlay);
	jQuery('.totalPanels').html('deersVars.totalPanels = '+deersVars.totalPanels);
	jQuery('.currentPanel').html('deersVars.currentPanel = '+deersVars.currentPanel);
	jQuery('.timePassed').html('deersVars.timePassed = '+deersVars.timePassed);
	jQuery('.timeToChange').html('deersVars.timeToChange = '+deersVars.timeToChange);
	jQuery('.inTansition').html('deersVars.inTansition = '+deersVars.inTansition);	
}
