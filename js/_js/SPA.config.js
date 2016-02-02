var SPA = SPA || {};

(function( $, SPA ) {

    // site configuration object

    'use strict';
			
	//	Checkbox filtering

	var checkboxes = $('.all-products input[type=checkbox]');
		
	SPA.config = {
		products : [],
		filters : {},
		checkboxes : checkboxes
    };

    return SPA;

})( jQuery, SPA );