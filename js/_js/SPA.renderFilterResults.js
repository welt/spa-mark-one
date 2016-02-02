var SPA = SPA || {};

(function( $, SPA ) {

	'use strict';
	
	// Find and render the filtered data results. Arguments are:
	// filters - our global variable - the object with arrays about what we are searching for.
	// products - an object with the full products list (from product.json).
	function renderFilterResults(filters, products){

		// This array contains all the possible filter criteria.
		var criteria = ['manufacturer','storage','os','camera'],
			results = [],
			isFiltered = false;

		// Uncheck all the checkboxes.
		// We will be checking them again one by one.
		SPA.config.checkboxes.prop('checked', false);

		criteria.forEach(function (c) {

			// Check if each of the possible filter criteria is actually in the filters object.
			if ( filters[c] && filters[c].length ) {


				// After we've filtered the products once, we want to keep filtering them.
				// That's why we make the object we search in (products) to equal the one with the results.
				// Then the results array is cleared, so it can be filled with the newly filtered data.
				if(isFiltered){
					products = results;
					results = [];
				}


				// In these nested 'for loops' we will iterate over the filters and the products
				// and check if they contain the same values (the ones we are filtering by).

				// Iterate over the entries inside filters.criteria (remember each criteria contains an array).
				filters[c].forEach( function (filter) {

					// Iterate over the products.
					products.forEach(function (item){

						// If the product has the same specification value as the one in the filter
						// push it inside the results array and mark the isFiltered flag true.

						if ( typeof item.specs[c] == 'number' ){
							if(item.specs[c] == filter){
								results.push(item);
								isFiltered = true;
							}
						}

						if ( typeof item.specs[c] == 'string' ){
							if(item.specs[c].toLowerCase().indexOf(filter) != -1){
								results.push(item);
								isFiltered = true;
							}
						}

					});

					// Here we can make the checkboxes representing the filters true,
					// keeping the app up to date.
					if ( c && filter ){
						$('input[name='+c+'][value='+filter+']').prop('checked',true);
					}
				});
			}

		});

		// Call the renderProductsPage.
		// As it's argument give the object with filtered products.
		SPA.renderProductsPage(results);
		
	}
	
	SPA.renderFilterResults = renderFilterResults;
	
	return SPA;
	
})(jQuery, SPA);