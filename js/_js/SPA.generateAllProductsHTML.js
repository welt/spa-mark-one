var SPA = SPA || {};

(function( $, SPA ) {

	'use strict';

	// This function is called only once - on page load.
	// It fills up the products list via a handlebars template.
	// It recieves one parameter - the data we took from products.json.
	
	function generateAllProductsHTML(data){

		var list = $('.all-products .products-list');

		var theTemplateScript = $("#products-template").html();
		
		//Compile the template​
		var theTemplate = Handlebars.compile(theTemplateScript);
		
		list.append( theTemplate(data) );

		// Each products has a data-index attribute.
		// On click change the url hash to open up a preview for this product only.
		// Remember: every hashchange triggers the render function.
		list.find('li').on('click', function (e) {
			e.preventDefault();

			var productIndex = $(this).data('index');

			window.location.hash = 'product/' + productIndex;
		})
		
	}
	
	SPA.generateAllProductsHTML = generateAllProductsHTML;
	
	return SPA;
	
})(jQuery, SPA);