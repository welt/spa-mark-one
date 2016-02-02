var SPA = SPA || {};

(function( $, SPA ) {

    'use strict';
    
	function render(url) {

		// Get the keyword from the url.
		var temp = url.split('/')[0];

		// Hide whatever page is currently shown.
		$('.main-content .page').removeClass('visible');

		var	map = {

			// The "Homepage".
			'': function() {

				// Clear the filters object, uncheck all checkboxes, show all the products
				SPA.config.filters = {};
				SPA.config.checkboxes.prop('checked',false);

				SPA.renderProductsPage(SPA.config.products);
			},

			// Single Products page.
			'#product': function() {

				// Get the index of which product we want to show and call the appropriate function.
				var index = url.split('#product/')[1].trim();

				SPA.renderSingleProductPage(index, SPA.config.products);
			},

			// Page with filtered products
			'#filter': function() {

				// Grab the string after the '#filter/' keyword. Call the filtering function.
				url = url.split('#filter/')[1].trim();

				// Try and parse the filters object from the query string.
				try {
					SPA.config.filters = JSON.parse(url);
				}
					// If it isn't a valid json, go back to homepage ( the rest of the code won't be executed ).
				catch(err) {
					window.location.hash = '#';
					return;
				}

				SPA.renderFilterResults(SPA.config.filters, SPA.config.products);
			}

		};

		// Execute the needed function depending on the url keyword (stored in temp).
		if ( map[temp] ){
			map[temp]();
		}
		// If the keyword isn't listed in the above - render the error page.
		else {
			SPA.renderErrorPage();
		}

	}
	
	SPA.render = render;
	
	return SPA
	
})(jQuery, SPA);
		