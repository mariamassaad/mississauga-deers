/*  CSS Document                                               */
/*  Main CSS for the layout and style of the Homepage Marquee  */

.marquee { height: 500px; width: 80% background-color: #ddd; }
.marquee * { font-family: 'Source Sans Pro'; }

.marquee .marquee_data { display: none; }

.marquee .marquee_stage_large { height: inherit; position: relative; overflow: hidden; }

.marquee .marquee_container_1, .marquee .marquee_container_2 { height: inherit; position: absolute; top: 0px; left: 0px; width: 100%; }
.marquee .marquee_container_1 { z-index: 101; }
.marquee .marquee_container_2 { z-index: 102; }

.marquee .marquee_panel { height: inherit; position: absolute; top: 0px; left: 0px; width: 100%; text-align: center; background-repeat: no-repeat; background-position: 100% 0px; }

.marquee .marquee_panel .panel_caption {
	width: 400px;
	background: rgba(255,255,255,.85);
	position: absolute; bottom: 0px; left: 15%;
	text-align: left;
	padding: 15px 15px 65px 20px; 
	border-top: 6px solid #fff;
	border-left: 6px solid #fff;
	border-right: 6px solid #fff; 
}
.marquee .marquee_panel .panel_caption * { color: #000000; line-height: 20px; }
.marquee .marquee_panel .panel_caption h3 { margin: 0px 0px 8px 0px; font-weight: normal; font-size: 1.8em; }
.marquee .marquee_panel .panel_caption p { margin: 0px 0px 15px 0px; color: #888; font-size: 1.1em; }
.marquee .marquee_panel .panel_caption a, .marquee .marquee_panel .panel_caption a:visited { color: #000000; text-decoration: underline; }
.marquee .marquee_panel .panel_caption a:hover { text-decoration: none; }

.marquee .marquee_nav { z-index: 103; position: absolute; bottom: 20px; left: 15%; text-align: left; width: 400px; padding: 0px 0px 0px 23px; }
.marquee .marquee_nav div {
	transition: background-color 1s linear;
	display: inline-block; width: 15px; height: 15px;
	background-color: rgba(255,255,255,.8);
	border: 2px solid #888;
	border-radius: 50%;
	margin: 0px 10px 0px 0px;
	cursor: pointer;
}

.marquee .marquee_nav div:hover { background-color: rgba(0,0,0,.2); transition: background-color .1s linear; }

.marquee .marquee_nav div.selected { background-color: rgba(0,0,0,.5); }

/*  small screen */
.marquee .marquee_stage_small { height: inherit; position: relative; overflow: hidden; }
.marquee .marquee_stage_small .marquee_panel { height: inherit; position: absolute; top: 0px; left: 0px; width: 100%; }

.marquee .marquee_stage_small .marquee_panel .panel_content { display: none; }

@media screen and (max-width: 600px) {

	.marquee { height: 200px; }
	.marquee .marquee_panel { background-size: cover; background-position: 75% 0px; }
	.marquee .marquee_panel .panel_caption { width: 75%; margin: 0px; padding: 10px 10px 10px 10px; text-align: center; }
	.marquee .marquee_panel .panel_caption h3 { font-size: 1.4em; }
	
}

