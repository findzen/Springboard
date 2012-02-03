/**
 * 
 * View component of the Model View Controller implementation
 *
 */
;(function( $, window, document, undefined ) {

	/**
	 * View
	 * @param {Object} dom References to DOM objects used in this view
	 * @constructor
	 */
	namespace.project.View = function( dom ) {
		/**
		 * @type {Object}
		 */
		this.dom = dom;
	
		// initialize
		this.init();
	};

	/**
	 * Init
	 */
	namespace.project.View.prototype.init = function() {
		Log.status( 'View init' );
	};

})( jQuery, window, document );

/* EOF */