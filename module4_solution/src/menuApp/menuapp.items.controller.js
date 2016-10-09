(function() {
	'use strict';
	angular.module('menuapp')
	.controller('ItemsController', ItemsController);

	ItemsController.$inject = ['$stateParams','items'];
	function ItemsController($stateParams, items) {
		var itemsCtrl = this;
		itemsCtrl.items = items.menu_items;
	}
})();