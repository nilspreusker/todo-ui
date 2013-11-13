'use strict';

var service = angular.module('todoApp.services', ['ngResource']);

service.factory('TodoService', ['$resource', function ($resource) {
    return $resource('/todo-rest/todo/:id', {id: '@id'}, {
        patch: {
            method: 'PATCH'
        }
    });
}]);
