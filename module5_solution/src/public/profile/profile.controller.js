(function () {
"use strict";

angular.module('public')
.controller('ProfileController', ProfileController);

ProfileController.$inject = ['MenuService'];
function ProfileController(MenuService) {
  var $ctrl = this;
  $ctrl.user = MenuService.getUser();
  if(Object.keys( $ctrl.user).length === 0 &&  $ctrl.user.constructor === Object) {
  	$ctrl.notSignedUp = true;
  	$ctrl.showProfile = false;

  } else {
  	$ctrl.notSignedUp = false;
  	$ctrl.showProfile = true;
  }
  
}

})();
