(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Home.IndexController', Controller);
 
    function Controller($scope, $http, UserService) {
        var vm = this;
        vm.user = null;
		vm.addtoDo = addtoDo;
 
        initController();
        
        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }
        function createTodo{
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	
         function addtoDo() {
            UserService.update(vm.user._id)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }
 
})();