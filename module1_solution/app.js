
(function(){
	"use strict";
	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject=['$scope'];
	function LunchCheckController($scope){

			$scope.list = "";
			$scope.result = "";
		
		$scope.checkIfTooMuch = function() {

			if ($scope.list.trim().length === 0)  {
				$scope.list = "";
				
				$scope.result = "Please enter data first";
				$scope.resultStyle = {
					"color": "red",
					"border": "1px solid red"
				}
			} else {

				var listItems = $scope.list.split(',');
				listItems = listItems.filter(function(n) {
					return n!= undefined && n!=""  && n.trim().length != 0;
				})

				if (listItems.length > 3) {
					$scope.result = "Too much!";

				} else {
					$scope.result = "Enjoy!";
				}
				$scope.resultStyle = {
				"color": "green",
				"border": "1px solid green"
			}

			}

		}

		$scope.clearResult = function() {{
			$scope.result = "";
			$scope.resultStyle = {}
		}}

	}
})();