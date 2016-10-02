(function() {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController )
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems',FoundItems)
	//optional - loading spinner implementation
	.component('itemsLoaderIndicator', {
		templateUrl:'spinner.html',
		controller: SpinnerController
	})
	.constant('RESTEndpoint', 'https://davids-restaurant.herokuapp.com/menu_items.json');

	NarrowItDownController.$inject = ['MenuSearchService', '$rootScope'];
	function NarrowItDownController (MenuSearchService,$rootScope) {
		var ctrl =this;
		ctrl.searchTerm;
		ctrl.found = [];
		ctrl.emptyMessage ="";

		ctrl.narrowItDown = function() {
			$rootScope.$broadcast('menuItems:processing',{on: true});

			var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
			promise.then(function(result) {
				ctrl.found = []; //deleting results of previous search
				for (var i = 0; i < result.length; i++) {
					var newItem = {
						name: result[i].name,
						short_name: result[i].short_name,
						description: result[i].description
					};
					ctrl.found.push(newItem);
				};
			})
			.finally(function() {
				if (ctrl.found.length === 0) {
					ctrl.emptyMessage = "Nothing found";
				} else {
					ctrl.emptyMessage = "Found " + ctrl.found.length + " items";
				};
				$rootScope.$broadcast('menuItems:processing',{on: false});
			})

		};

		ctrl.onRemove = function(index) {
			ctrl.found.splice(index, 1);
		}
	};
//optional - loading spinner implementation
	SpinnerController.$inject = ['$rootScope']
	function SpinnerController ($rootScope) {
		var $ctrl = this;

		$rootScope.$on('menuItems:processing', function(event, data) {
			if (data.on == true) {
				$ctrl.showSpinner = true;
			} else {
				$ctrl.showSpinner = false;
			}
		})

	}
	MenuSearchService.$inject = ['$http', 'RESTEndpoint']
	function MenuSearchService ($http, RESTEndpoint) {
		var service = this;

		service.getMatchedMenuItems = function(searchTerm) {
			return $http({
				method: 'GET',
				url: RESTEndpoint
			})
			.then(function (result) {
				var foundItems;
				if (!searchTerm) {
                    foundItems = [];
                    return foundItems;
				}
				foundItems = result.data.menu_items.filter(function(item) {
					return item.description.toLowerCase().indexOf(searchTerm)!==-1;
				});
    return foundItems;
});

		};
	};

	function FoundItems () {
		var ddo ={
			restrict: 'E',
			templateUrl:'foundItems.html',
			scope: {
				foundItems:'<',
				emptyMessage: '@',
				onRemove: '&'
			}

		};
		return ddo;
	}
})();