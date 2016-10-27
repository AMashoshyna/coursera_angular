(function () {
"use strict";

angular.module('public')
.controller('SubscriptionController', SubscriptionController);

SubscriptionController.$inject = ['MenuService','$state'];
function SubscriptionController(MenuService,$state) {
  var $ctrl = this;
  $ctrl.userData = {
  	firstName: 'Anna',
  	lastName: 'Johnes',
  	email: 'anna@mail.com',
  	phone: '555 555 555',
  	favDish: ''
  };
  $ctrl.checkCatMessage;

  $ctrl.saveData = function(userData) {
  	MenuService.user  = JSON.parse(JSON.stringify(userData));
  	$ctrl.checkCatMessage = "Your data has been saved!";
  }

  $ctrl.validateForm = function(shortName) {
  	 $ctrl.checkMenuItem(shortName).then((response) => {
  	 	$ctrl.userData.favDish = response.data;
  	 	$ctrl.saveData($ctrl.userData);
  	 })
  	 .catch((response)=>{$ctrl.checkCatMessage = "No such menu number exists"})
  }

  $ctrl.checkMenuItem = function(shortName) {
  	return MenuService.checkCategory(shortName)
  	.catch((response)=>{$ctrl.checkCatMessage = "No such menu number exists"})
  }
}

})();
