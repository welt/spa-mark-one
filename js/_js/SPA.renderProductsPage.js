var SPA = SPA || {};

(function( $, SPA ) {

	'use strict';
	
	// This function receives an object containing all the product we want to show.

	function renderProductsPage(data){

		var page = $('.all-products'),
			allProducts = $('.all-products .products-list > li');

		// Hide all the products in the products list.
		allProducts.addClass('hidden');

		// Iterate over all of the products.
		// If their ID is somewhere in the data object remove the hidden class to reveal them.
		allProducts.each(function () {

			var that = $(this);

			data.forEach(function (item) {
				if(that.data('index') == item.id){
					that.removeClass('hidden');
				}
			});
		});

		// Show the page itself.
		// (the render function hides all pages so we need to show the one we want).
		page.addClass('visible');

	}
	
	SPA.renderProductsPage = renderProductsPage;
	
	return SPA;
	
})(jQuery, SPA);