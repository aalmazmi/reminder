(function () {
	'use strict';
	
	angular
		.module('app')
		.controller('Account.IndexController', Controller);
		
		function Controller ($window, UserService, FlashService) {
			var vm = this;
			
			vm.user = null;
			vm.addUser = addUser;
			vm.removeUser = removeUser;
			
			initController();
			
			function initController() {
				Useres.GetCurrent().then(function (user) {
					vm.user = user;
				});
			}
			function removeUser() {
				Useres.Remove(vm.user._id)
					.then(function () {
						$window.location = '\login';
					})
					.catch(function (error) {
						Flashes.Error(error);
					});
			}
			function addUser() {
				Useres.Update(vm.user)
					.then(function() {
						Flashes.Success('User update');
						}).catch(function (error) {
							Flashes.Error(error);
							});
			}
			
		}
	})();