/**
 * 
 * Application
 *
 */
;(function( $, window, document, undefined ) {

	/**
	 * Application
	 * @constructor
	 */
	namespace.project.App = function() {
		/**
		 * @type {namespace.project.Model}
		 */
		this.model;
	
		/**
		 * @type {namespace.project.View}
		 */
		this.view;
	
		/**
		 * @type {namespace.project.Controller}
		 */
		this.controller;
	
		// initialize
		this.init();
	};


	/**
	 * Init
	 */
	namespace.project.App.prototype.init = function() {
		Log.status( 'App init' );
	
		var	data = {},
			dom = {};

		this.model		= new namespace.project.Model( data );
		this.view		= new namespace.project.View( dom );
		this.controller	= new namespace.project.Controller( this.model, this.view );

		if ( window.DEBUG ) {
			window.model 		= this.model;
			window.controller 	= this.controller;
			window.view 		= this.view;
		}
	};

})( jQuery, window, document );

/* EOF */