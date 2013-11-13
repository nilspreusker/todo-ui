'use strict';

angular.module('todoApp')
    .controller('todoController', ['$scope', '$location', 'TodoService', function ($scope, $location, TodoService) {
        $scope.todos = TodoService.query();

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
            TodoService.patch(todo);
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
