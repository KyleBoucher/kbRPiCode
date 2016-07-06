var mainModule = angular.module('mainModule', ['ngRoute']);

mainModule.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase:false
	});

	$routeProvider
	  .when('/', {
		templateUrl:'/views/home',
        controller:'homeController'
	  })
	  .otherwise({
		redirectTo:'/'
	  });
});

