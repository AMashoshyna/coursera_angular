(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.subscibe', {
      url: '/subscribe',
      templateUrl: 'src/public/subscribe/subscribe.html',
      controller: 'SubscriptionController',
      controllerAs: 'subCtrl',
      // resolve: {
      //   categories: ['MenuService',function(MenuService) {
      //     return MenuService.getCategories()
      //   }]
      // }

    })
    .state('public.profile', {
      url: '/profile',
      templateUrl:'src/public/profile/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profileCtrl',
    })
}
})();
