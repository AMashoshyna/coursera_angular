(function() {
	'use strict';
	angular.module('menuapp')
	.component('items', {
		bindings: {
		items: '<'
		},
		template: `

		<ul>
		<li ng-repeat="item in $ctrl.items">
		<div><strong>{{item.name}}</strong></div>
		<div>{{item.description}}</div>
		</li></ul>
		</div></div>
`
	})
})();