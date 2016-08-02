(function(window, angular, _) {

    'use strict';

    //Module
    var biography = angular.module('biography', [

        // Angular core plugins
        'ngResource',
        'ngRoute',
        'ngCookies',
        'ngStorage',
        'ngSanitize',
        'ngAnimate',

        // 3rd Party plugins
        'ui.router',
        'ui.bootstrap',
        'naif.base64',
        '720kb.datepicker',
        'smart-table',
        'ngProgress',
        'oitozero.ngSweetAlert',
        'rzModule',
        'angularUtils.directives.dirPagination',
        'ngMask',

        // Module Dependencies
        'biography.shared',
        'biography.dashboard'
        /*'sasretail.customer',
        'sasretail.project',
        'sasretail.program',
        'sasretail.workforce',
        'sasretail.activation',
        'sasretail.operations',
        'sasretail.shared'*/
    ]);

    var _lang =  (window.location.href).split(window.location.origin)[1].split('/')[1];
    var pagePartsTemplatesPath = '/templates/partial/';
    var includeObject = {
        header: {
            templateUrl: pagePartsTemplatesPath + 'header-partial',
            controller: 'HeaderController'
        },
        footer: {
            templateUrl: pagePartsTemplatesPath + 'footer-partial',
            controller: 'FooterController'
        }
    };

    /**
     * @name run
     * @desc Update xsrf $http headers to align with Django's defaults
     */
    var run = function ($http, $rootScope, $anchorScroll,$localStorage, $state,$stateParams, SweetAlert) {

       // $state.go('dashboard',{'lang':$rootScope.lang});

    //     $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState,fromParams) {

    //         debugger;
    //        // $state.go(toState.name, toParams);

    //     });
    //     $rootScope.$on('$stateChangeSuccess', function() {
    //         $anchorScroll();
    //     });
    };

    biography.controller('AppController', ['$http', '$scope', '$rootScope', '$localStorage', '$state', 'ngProgressFactory', 'SweetAlert',

        function($http, $scope, $rootScope, $localStorage, $state, ngProgressFactory, SweetAlert) {

            $rootScope.lang = 'en';
            $rootScope.go = function(state) {


                $state.go(state, {lang: $rootScope.lang});
            };

            // Editor options.
            $rootScope.ckeditorOptions = {
                language: 'en',
                allowedContent: true,
                entities: false,
                height: '200px'
            };

            //handle SweetAlert Error
            $rootScope.handleSweetError = function(error) {
                SweetAlert.swal({title: 'Error!', text: error.data.message, type: 'error'});
            };

            //for progress bar
            $scope.progressbar = ngProgressFactory.createInstance();
            $scope.progressbar.setColor('#33ffff'); //#66ffcc, #80d4ff, #33ffff
            $scope.progressbar.setHeight('3px');

            $scope.$watch(function() {

                return $rootScope.isLoading;

            }, function(newValue, oldValue) {

                if(newValue === true) {
                    $scope.progressbar.start();
                } else {
                    $scope.progressbar.complete();
                }
            });

        }]);

    // Routing using ui-router via states
    biography.config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider,  $interpolateProvider) {

    
        var dashboardUrlBase = '/templates/dashboard/';
        var customerUrlBase = '/templates/customer/';


        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');


        $stateProvider
            .state('dashboard',{
                url: '/biography/dashboard',
                views: {
                    header: includeObject.header,
                    footer: includeObject.footer,
                    content:{
                        templateUrl: dashboardUrlBase + 'dashboard.html',
                        controller: 'DashboardController'
                    }
                },
                data: {
                    access: ['all']
                }

            });
            /*
               .state('profile', {
                url: '/:lang/sasretail/customer/profile',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: customerUrlBase + 'step1-partial',
                        controller: 'CustomerStep1Controller'
                    }
                },
                data: {
                        access:['Admin','Program Manager']
                }
            })
            .state('step1', {
                url: '/:lang/sasretail/customer/step1',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: customerUrlBase + 'step1-partial',
                        controller: 'CustomerStep1Controller'
                    }
                },
                data: {
                    access:['Admin','Program Manager']
                }
            })
            */

            $urlRouterProvider.otherwise('/biography/dashboard');
            // $locationProvider.html5Mode(true);
    });

    angular
        .module('biography')
        .run(run);

    run.$inject = ['$http','$rootScope','$anchorScroll','$localStorage','$state','$stateParams','SweetAlert'];

})(window, angular, _);













