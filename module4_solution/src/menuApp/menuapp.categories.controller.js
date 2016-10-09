(function(){
	'use strict';

	angular.module('menuapp')
	.controller('CategoriesController', CategoriesController);

	CategoriesController.$inject = ['MenuDataService', 'categories'];
	function CategoriesController(MenuDataService, categories) {
		var catCtrl = this;
		catCtrl.categories= categories;	
	}
})();