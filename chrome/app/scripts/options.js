'use strict';

var LazyHacker = angular.module('LazyHacker', {});

LazyHacker.controller('OnboardController', function ($scope) {
    $scope.banned = [{
        name: 'Facebook',
        hostname: 'facebook.com'
    }, {
        name: 'Twitter',
        hostname: 'twitter.com'
    }];

});
