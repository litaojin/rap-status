var app = angular.module('App', []);

app.controller('MainController', function($scope, $http){
    $scope.title = "Mobile Portal";
    $scope.message = "Hello";        
});

