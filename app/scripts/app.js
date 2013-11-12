'use strict';

angular.module('todoApp', ['ngRoute', 'todoApp.services', 'todoApp.filters'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'todoController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
