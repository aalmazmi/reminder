(function () {
    'use strict';
     
     angular
        .module('app')
        .controller('mainController', Controller);
 
function Controller($scope, $http, UserService) {
var vm = this
	vm.user = null
	var myem = null
	initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                myem = user.email;
            });
            }
	$scope.formData = {
	text:'',
	inte:0
	};
	$scope.formData2 = {};
	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.createTodo = function() {
		$scope.formData.text = vm.user.username + ":" + $scope.formData.text

		for (var i=0; i < $scope.formData.inte; i++) {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
					console.log($scope.formData);
					$scope.formData = {}; 
					$scope.todos = data;
					console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		}
	};

	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
  

}

})();

  