var SPA = SPA || {};

(function( $, SPA ) {

    'use strict';
    
	// Get the filters object, turn it into a string and write it into the hash.
	function createQueryHash(filters){

		// Here we check if filters isn't empty.
		if(!$.isEmptyObject(filters)){
			// Stringify the object via JSON.stringify and write it after the '#filter' keyword.
			window.location.hash = '#filter/' + JSON.stringify(filters);
		}
		else{
			// If it's empty change the hash to '#' (the homepage).
			window.location.hash = '#';
		}

	}
	
	SPA.createQueryHash = createQueryHash;
	
	return SPA
	
})(jQuery, SPA);
		