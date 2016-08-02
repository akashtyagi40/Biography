(function(){
	'use strict';

	angular.module('sasretail.shared.controllers')

	.controller('SidebarController', ['$scope','$rootScope','$sessionStorage','$state', '$location', '$timeout', 'GlobalDataService', '$stateParams',function($scope,$rootScope,$sessionStorage,$state,$location,$timeout, GlobalDataService,$stateParams){
		//GlobalDataService.getSideBar($scope);
		$rootScope.lang = $stateParams.lang;
		$scope.$state = $state;
		$timeout(function() {
			SASAPP.handleMegaMenu();
		},0);

		var url = $location.url();
		var baseEntity = url.split('/')[3];
		var childBaseEntity = url.split('/')[4];

		$scope.navigateToCustomer = function(){
			if($sessionStorage.customerData){
				delete $sessionStorage.customerData;
			}
			if($sessionStorage.jdeData){
				delete $sessionStorage.jdeData;
			}
			$state.go('step1',{'lang':$stateParams.lang});
		};

		$scope.navigateToProgram = function(){
			if($sessionStorage.program){
				delete $sessionStorage.program;
			}
			$state.go('programSetupStep1',{'lang':$stateParams.lang});
		};

		$scope.navigateToProject = function(){
			if($sessionStorage.project){
				delete $sessionStorage.project;
			}
			if($sessionStorage.projectClone){
				delete $sessionStorage.projectClone;
			}
			if($sessionStorage.projectData){
				delete $sessionStorage.projectData;
			}
			if($sessionStorage.projectBillingData){
				delete $sessionStorage.projectBillingData;
			}
			$state.go('projectSetupGeneral',{'lang':$stateParams.lang});
		};
		
		// For parents
		$scope.customerActive = baseEntity == 'customer';
		$scope.projectActive = baseEntity == 'project';
		$scope.programActive = baseEntity == 'program';
		$scope.operationActive = baseEntity == 'operations';
		$scope.workforceActive = baseEntity == 'workforce';
		$scope.activationActive = baseEntity == 'activation';

		// For Child
		// Customer Links
		
		if(baseEntity == 'dashboard'){
			$scope.dashboardActive = true;
		}

		if(baseEntity == 'activation'){
			$scope.cycleManagementActive = true;
		}

		if(baseEntity == 'customer' && (childBaseEntity == 'step1' || childBaseEntity == 'step2' || childBaseEntity == 'step3' || childBaseEntity == 'step4')) {
			$scope.customerActiveChild2 = true;
		} else if (baseEntity == 'customer' && (childBaseEntity == 'management' || childBaseEntity == 'edit')) {
			$scope.customerActiveChild1 = true;
		} else {
			$scope.customerActiveChild1 = false;
			$scope.customerActiveChild2 = false;
		}

		// Project Links
		if(baseEntity == 'project' && (childBaseEntity == 'general' || childBaseEntity == 'services' || childBaseEntity == 'billing' || childBaseEntity == 'summary')) {
			$scope.projectActiveChild2 = true;
			
		} else if (baseEntity == 'project' && (childBaseEntity == 'management' || childBaseEntity == 'edit')) {
			$scope.projectActiveChild1 = true;
			
		} else {
			
			$scope.projectActiveChild1 = false;
			$scope.projectActiveChild2 = false;
		}

		// Program Links
		if(baseEntity == 'program' && (childBaseEntity == 'step1' || childBaseEntity == 'step2' || childBaseEntity == 'step3' || childBaseEntity == 'step4')) {
			$scope.programActiveChild2 = true;
		} else if (baseEntity == 'program' && (childBaseEntity == 'management' || childBaseEntity == 'edit')) {
			$scope.programActiveChild1 = true;
		} else {
			$scope.programActiveChild1 = false;
			$scope.programActiveChild2 = false;
		}

		//Operation Links
		$scope.$on('operationsSideMenu', function(event, childEntity) { 

			$scope.operationActiveChild1 = false;
			$scope.operationActiveChild2 = false;
			$scope.operationActiveChild3 = false;
			$scope.operationActiveChild4 = false;

			if(childEntity !== 'operations-schedule-view') {
				delete $sessionStorage.schedule_fields;
			}

			/* 'field-data-management', 'time-and-expense', 'operations-schedule-view' */
			if(baseEntity === 'operations' && ('field-data-management' === childEntity)) {
				$scope.operationActiveChild1 = true;
			} else if (baseEntity === 'operations' && ('time-and-expense' === childEntity)) {
				$scope.operationActiveChild2 = true;
			} else if (baseEntity === 'operations' && ('operations-schedule-view' === childEntity)) {
				$scope.operationActiveChild3 = true;
			} else if (baseEntity === 'operations' && ('bill-prep-merchandiser-view' === childEntity)) {
				$scope.operationActiveChild4 = true;
			}
		 });

		/*$scope.programActiveChild1 = childBaseEntity == 'management';
		$scope.programActiveChild2 = childBaseEntity == 'step1' || 'step2' || 'step3' || 'step4' || 'edit';*/
	}]);

})();
