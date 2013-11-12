'use strict';

var filters = angular.module('todoApp.filters', []);

filters.filter('moments', function() {
    return function(date) {
        return moment(date).fromNow();
    };
});
