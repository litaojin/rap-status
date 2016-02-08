var app = angular.module('App', []);

app.controller('MainController', function($scope, $http){
    $scope.Title = "Mobile Portal";
    $scope.message = "Hello";        
});

