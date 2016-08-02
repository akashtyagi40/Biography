(function() {
	'use strict';

	angular.module('biography.dashboard.controllers',[])
		.controller('DashboardController', ['$scope', '$state', '$rootScope', '$stateParams', '$uibModal', '$sessionStorage', '$timeout','$http','SweetAlert',
			function($scope, $state, $rootScope, $stateParams, $uibModal, $sessionStorage, $timeout,  $http, SweetAlert) {

				$rootScope.pageTitle = 'Dashboard';
				
			}
		]);

})();
