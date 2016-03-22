var SPA = SPA || {};

(function( $, SPA ) {

	'use strict';
	
	// Opens up a preview for one of the products.
	// Its parameters are an index from the hash and the products object.
	
	function renderSingleProductPage(index, data){

		var page = $('.single-product'),
			container = $('.preview-large');

		// Find the wanted product by iterating the data object and searching for the chosen index.
		if ( data.length ){ 
			data.forEach( function (item) {
				if ( item.id == index ){
					// Populate '.preview-large' with the chosen product's data.
					container.find('h3').text(item.name);
					container.find('img').attr('src', item.images.large);
					container.find('p').text(item.description);
				}
			});
		}

		// Show the page.
		page.addClass('visible');

	}
	
	SPA.renderSingleProductPage = renderSingleProductPage;
	
	return SPA;
	
})(jQuery, SPA);
