(function( $ ) {
    $.fn.jkbnav = function() {
  	var listening = false;
		var searchstring = "";
		var singleActive = false;
		$(document).keypress(function(event) {
			if (listening) {
				if (singleActive && event.which == 13)
				{
					activeElement = $('.jkbnav[data-kbnav*="' + searchstring + '"]')[0];
					console.log("Activating " + activeElement);
					activeElement.click();
				}
				searchstring = searchstring + String.fromCharCode(event.which);
				console.log(searchstring);
				console.log($('.jkblabel').length);
				$('.jkblabel:not([data-kbnav="' + searchstring + '"])').hide();
				$('.jkblabel[data-kbnav*="' + searchstring + '"]').show();
				if (($('.jkblabel[data-kbnav*="' + searchstring + '"]').length) == 1) {
					console.log("Changing Color");
					$('.jkblabel[data-kbnav*="' + searchstring + '"]').addClass("jkbactive");
					singleActive = true;
				}
			}
		});
		$(document).keydown(function(event) {
			if (event.shiftKey && event.ctrlKey) {
				if (listening) {
					listening = false;
					searchstring = "";
					singleActive = false;
					$('.jkblabel').removeClass('jkbactive').hide();
				}
				else {
					listening = true;
					$('.jkblabel').show();
				}
				console.log(listening);
			}
		});
		return this.find('.jkbnav').each(function() {
			var myPosition = $(this).offset();
			myPosition.left = myPosition.left + 5;
			myPosition.top = myPosition.top + 5;
			//console.log(myPosition);
			//console.log(myPosition);
			$('<div />', {
				class: 'jkblabel',
				offset: myPosition,
				text: $(this).attr('data-kbnav'),
				css: {position: 'absolute' },
				hidden: true,
				'data-kbnav': $(this).attr('data-kbnav')
			}).appendTo($(this));
		}); 
    };
	
}( jQuery ));
