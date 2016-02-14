var app = angular.module('App', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController'
        })
        .when('/wkload', {
            templateUrl: 'pages/workload.html',
            controller: 'WorkloadController'
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
        .get('/api/wkload_desc')
        .success(function(data, status, header, config){
            console.log('APIGET wkload_desc');
            $scope.Wkloads = data;
        })
        .error(function(data, status, header, config){
            console.log('APIGET wkload_desc failed');            
        });
    $scope.show_changes = function(index){
        $scope.Changes = $scope.Branches[index].changes;
        $rootScope.message = $scope.Branches[index].BranchName; 
    }

});
app.controller('WorkloadController', function($rootScope, $scope, $http){
    $rootScope.Title = "Bug Assignment";
    $rootScope.message = "Hello"; 
    $http
        .get('/api/wkload_desc')
        .success(function(data, status, header, config){
            console.log('APIGET wkload_desc');
            $scope.targets = data;
            
        })
        .error(function(data, status, header, config){
            console.log('APIGET wkload_desc failed');            
        });
    $http
        .get('/api/wkload')
        .success(function(data, status, header, config){
            console.log('APIGET wkload');
            $scope.workloads = data;
        })
        .error(function(data, status, header, config){
            console.log('APIGET wkload failed');            
        });    

});
