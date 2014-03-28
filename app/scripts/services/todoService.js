'use strict';

var service = angular.module('todoApp.services', ['ngResource']);

service.factory('TodoService', ['$resource', function ($resource) {
    return $resource('/todo-rest/todo/:id', {id: '@id'}, {
        patch: {
            method: 'PATCH'
        }
    });
}]).factory('Keycloak', ['$q', function ($q) {
    var deferred = $q.defer();
    var keycloak = Keycloak({
        clientId: 'todo-ui',
        realm: 'demo',
        onload: 'login-required',
        url: 'http://localhost',
        clientSecret: '42814939-2e46-4dbd-ad1e-29aa95f02428'
    });

    keycloak.init(function () {
        console.log("Initialization of keycloak succeeded!");

        deferred.resolve(keycloak);

    }, function () {
        console.log("Initialization of keycloak failed!");

        deferred.reject(keycloak);

    });

    return deferred.promise;
}]).factory('OAuthInterceptor', ['$q', 'Keycloak', function ($q, keycloak) {
    return {
        'request': function (config) {

            var deferred = $q.defer();

            keycloak.then(function (kc) {

                kc.onValidAccessToken(function () {

                        config.headers.Authorization = 'Bearer ' + kc.token;

                        deferred.resolve(config || $q.when(config));
                    },
                    function (data) {
                        console.log("oops, something went wrong!");

                        deferred.reject(data);




//                        kc.login();
                    });
            });

            return deferred.promise;
        },
        'requestError': function (rejection) {

            console.log("error interceptor called");

            return $q.reject(rejection);
        }
    };
}]).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('OAuthInterceptor');
}]);

