---
exclude: 'yes'
---

{% include_relative _js/SPA.config.js %}

;

{% include_relative _js/SPA.render.js %}

;

{% include_relative _js/SPA.generateAllProductsHTML.js %}

;

{% include_relative _js/SPA.renderProductsPage.js %}

;

{% include_relative _js/SPA.renderSingleProductPage.js %}

;

{% include_relative _js/SPA.renderFilterResults.js %}

;

{% include_relative _js/SPA.renderErrorPage.js %}

;

{% include_relative _js/SPA.createQueryHash.js %}

;

(function($, SPA) {

    'use strict';

    $(document).ready(function() {
    
    	var filters = SPA.config.filters;
    
		//	Event handlers for frontend navigation

		//	Checkbox filtering

		var checkboxes = SPA.config.checkboxes;

		checkboxes.click(function () {

			var that = $(this),
				specName = that.attr('name');

			// When a checkbox is checked we need to write that in the filters object;
			if ( that.is(":checked") ) {

				// If the filter for this specification isn't created yet - do it.
				if ( ! ( filters[specName] && filters[specName].length ) ) {
					filters[specName] = [];
				}

				//	Push values into the chosen filter array
				filters[specName].push(that.val());

				// Change the url hash;
				SPA.createQueryHash(filters);

			}

			// When a checkbox is unchecked we need to remove its value from the filters object.
			if (! that.is(":checked")) {

				if ( filters[specName] && filters[specName].length && ( filters[specName].indexOf( that.val()) != -1 ) ) {

					// Find the checkbox value in the corresponding array inside the filters object.
					var index = filters[specName].indexOf(that.val());

					// Remove it.
					filters[specName].splice(index, 1);

					// If it was the last remaining value for this specification,
					// delete the whole array.
					if ( ! filters[specName].length ) {
						delete filters[specName];
					}

				}

				// Change the url hash;
				SPA.createQueryHash(filters);
			}
		});

		// When the "Clear all filters" button is pressed change the hash to '#' (go to the home page)
		$('.filters button').click(function (e) {
			e.preventDefault();
			window.location.hash = '#';
		});

		// Single product page buttons

		var singleProductPage = $('.single-product');

		singleProductPage.on('click', function (e) {

			if ( singleProductPage.hasClass('visible') ) {

				var clicked = $(e.target);

				// If the close button or the background are clicked go to the previous page.
				if (clicked.hasClass('close') || clicked.hasClass('overlay')) {
					// Change the url hash with the last used filters.
					SPA.createQueryHash(filters);
				}

			}

		});

		// These are called on page load

		// Get data about our products from products.json.
/*		$.getJSON( "products.json", function( data ) {

			// Write the data into our global variable.
			SPA.config.products = data;

			// Call a function to create HTML for all the products.
			SPA.generateAllProductsHTML(data);

			// Manually trigger a hashchange to start the app.
			$(window).trigger('hashchange');
			
		});
*/		
		$.ajax( {
		  url: 'http://restmk1.dev/wp-json/wp/v2/phones',
		  success: function ( data ) {
			// Write the data into our global variable.
			SPA.config.products = data;

			// Call a function to create HTML for all the products.
			SPA.generateAllProductsHTML(data);

			// Manually trigger a hashchange to start the app.
			$(window).trigger('hashchange');
		  },
		  cache: false
		} );

		// An event handler with calls the render function on every hashchange.
		// The render function will show the appropriate content of out page.
		$(window).on('hashchange', function(){
			SPA.render( decodeURI(window.location.hash) );
		});
		
    });

})(jQuery, SPA);