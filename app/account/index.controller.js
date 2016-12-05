(function () {
    'use strict';
     
     angular
        .module('app')
        .controller('mainController', Controller);
 
function Controller($scope, $http) {
	$scope.formData = {};
	$scope.formData2 = {};
	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; 
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
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
