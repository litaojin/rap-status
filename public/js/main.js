var app = angular.module('App', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'HomeController'
		})
});

app.controller('HomeController', function($rootScope, $scope, $http, $location){
    $rootScope.Title = "Portal";
    $rootScope.message = "Hello";        
});

