var SPA = SPA || {};

(function( $, SPA ) {

    'use strict';
    
	// Shows the error page.
	function renderErrorPage(){
		var page = $('.error');
		page.addClass('visible');
	}
	
	SPA.renderErrorPage = renderErrorPage;
	
	return SPA
	
})(jQuery, SPA);
		