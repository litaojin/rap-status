var app = angular.module('adminApp', ['ngRoute']);

app.factory('socket', function ($rootScope) {
    var socket = io.connect('http://10.64.20.11/');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});

app.controller('MainController', function($scope, $http, $location, socket){
    $scope.Title = "Instant Release Portal Admin";
    $scope.message = "filelog";
    $scope.output = "XXX";

    socket.on('message', function(data){
        $scope.output = data;
    });
    socket.on('user', function(data){
        $scope.message = String(data);
    });

    $scope.submit = function(){
        socket.emit('message', "Hello");
    }    
});