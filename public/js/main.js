var app = angular.module('App', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController'
        })

        .otherwise({
            redirectTo: '/'
        });

});
app.controller('MainController', function($rootScope){
    $rootScope.Title = "Mobile Portal";
    $rootScope.message = "Hello";
});

app.controller('HomeController', function($rootScope, $scope, $http){
    $rootScope.Title = "Instant Engineering Portal";
    $rootScope.message = "Hello"; 
    $scope.Changes = [];
    $http
    	.get('/api/status')
    	.success(function(data, status, header, config){
    		console.log('APIGET status');
    		$scope.Branches = data;
            
    	})
    	.error(function(data, status, header, config){
    		console.log('APIGET status failed');    		
    	});
    $http
        .get('/api/wkload')
        .success(function(data, status, header, config){
            console.log('APIGET status');
            $scope.Wkloads = data;
        })
        .error(function(data, status, header, config){
            console.log('APIGET status failed');            
        });
    $scope.show_changes = function(index){
        $scope.Changes = $scope.Branches[index].changes;
    }

});

