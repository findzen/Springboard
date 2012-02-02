/**
 * Model component of the Model View Controller implementation
 * @param {Object=} data Initial data for the model
 * @constructor
 */
namespace.project.Model = function( data ) {
	
	/**
	 * @type {Object}
	 */
	this.data = data || {};
	
	// initialize
	this.init();
	
};


/**
 * Init
 */
namespace.project.Model.prototype.init = function() {
	
	Log.status('Model init');
	
};


/* EOF */