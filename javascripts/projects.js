/**
 * This script handles the project page on tom.broerse.me
 */ 
$(document).ready(function() {
	var 
		/**
		 * Indicates whether we've initiated the slide show widget
		 * (orbit) or not.
		 * @type Boolean
		 */
		orbitInitiated = false,
		
		/**
		 * Centers the panel (horizontally) in the viewport
		 * @function
		 * @returns Void
		 */
		centerPanel = function () {
			$('#project-slides-panel').css(
				'margin-left',
				'-' + (
					($('#project-slides-panel').width()/$(window).width())*100
				)/2 + '%'
			);
		};

	//
	// First up, copy (partly hidden) project page content into slides
	// container
	//
	$('#project-slides-container').append($('.project').clone());

	//
	// Popup the project slides when a project in the list is clicked
	//
	$('.project').click(function() {
		$('#project-slides-panel').reveal();
		centerPanel();

		if (!orbitInitiated) {
			$('#project-slides-container').orbit({ timer: false })
			orbitInitiated = true;
		}

		$('#project-slides-container')
			.trigger('orbit.goto', $(this).index()-2);

	});

	//
	// Keep our panel centered on window resize
	//
	$(window).resize(centerPanel);
});
