(function () {
	'use strict';
	
	angular
		.module('app')
		.controller('Account.IndexController', Controller);
		
		function Controller ($window, UserService, FlashService) {
			var cu = this;
			
			cu.user = null;
			cu.addUser = addUser;
			cu.removeUser = removeUser;
			
			initController();
			
			function initController() {
				Useres.GetCurrent().then(function (user) {
					cu.user = user;
				});
			}
			function removeUser() {
				Useres.Remove(cu.user._id)
					.then(function () {
						$window.location = '\login';
					})
					.catch(function (error) {
						Flashes.Error(error);
					});
			}
			function addUser() {
				Useres.Update(cu.user)
					.then(function() {
						Flashes.Success('User update');
						}).catch(function (error) {
							Flashes.Error(error);
							});
			}
			
		}
	})();