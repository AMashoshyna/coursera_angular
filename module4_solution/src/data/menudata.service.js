(function() {
	'use strict';

	angular.module('data')
	.service('MenuDataService', MenuDataService);

	MenuDataService.$inject = ['$http']
	function MenuDataService($http) {
		var service = this;
		service.getAllCategories = function () {
			var restapi = 'https://davids-restaurant.herokuapp.com/categories.json';
			return $http.get(restapi).then(function(response) {
				return response.data;
			})
		};

		service.getItemsForCategory = function(categoryShortName) {
			var restapi = ' https://davids-restaurant.herokuapp.com/menu_items.json?category=';
			return  $http.get(restapi + categoryShortName).then(function(response) {
				return response.data;
			})
		};
	}

})();