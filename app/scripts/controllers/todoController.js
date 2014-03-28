'use strict';

angular.module('todoApp', ['ngRoute', 'todoApp.services', 'todoApp.filters'])
    .controller('todoController', ['$scope', '$location', 'TodoService', 'Keycloak', function ($scope, $location, TodoService, Keycloak) {
        $scope.todos = TodoService.query();

        $scope.logout = function () {
            Keycloak.then(function (kc) {
                kc.logout();
            });
        };

        Keycloak.then(function (kc) {
            if (kc.idToken) {
                $scope.userName = kc.idToken.preferred_username;
            } else {
                console.log('No idToken... need to load it!');
            }
        });

        $scope.addTodo = function () {
            TodoService.save(
                {
                    text: $scope.todoText,
                    done: false
                },
                function () {
                    $scope.todos = TodoService.query();
                }
            );
            $scope.todoText = '';
        };

        $scope.toggleDone = function (todo) {
            TodoService.patch(todo).then(function() {
                // nothing to do here
            }, function () {
                todo.done = !todo.done;
            });
        };

        $scope.clearDone = function () {
            angular.forEach($scope.todos, function (todo, index) {
                var count = 0;
                if (todo.done) {
                    TodoService.delete({id: todo.id}, function () {
                        $scope.todos = TodoService.query();
                    });
                }
            });
        };
    }]);
