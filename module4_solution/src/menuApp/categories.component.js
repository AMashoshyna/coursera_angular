(function() {
	'use strict';
	angular.module('menuapp')
	.component('categories', {
		bindings: {
			categories: '<'
		},
		template: 
		`<ul>
		<li ng-repeat="category in $ctrl.categories" 
		ui-sref="items({category:category.short_name})">
		<a>{{category.name}}</a>
		</li>
		</ul>`
		
	})
})();