(function() {
	'use strict';
	angular.module('menuapp')
	.config(RoutesConfig);


    RoutesConfig.$inject= ['$stateProvider', '$urlRouterProvider'];
	function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
        
        $stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'src/menuApp/templates/home.html'

		})

		.state('categories', {
			url: '/categories',
			templateUrl: 'src/menuApp/templates/categories.html',
			resolve: {
				categories: ['MenuDataService', function(MenuDataService) {
					return MenuDataService.getAllCategories()
				}]
			},
			controller: 'CategoriesController as catCtrl',
		})

		.state('items', {
			url: '/items/{category}',
			templateUrl: 'src/menuApp/templates/items.html',
			resolve: {
				items: ['$stateParams','MenuDataService', 
				function($stateParams, MenuDataService) {
					return MenuDataService.getItemsForCategory($stateParams.category)
				}]
			},
			controller: 'ItemsController as itemsCtrl',
		});
	}
})();

