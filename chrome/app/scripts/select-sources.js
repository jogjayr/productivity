/*jshint unused:false*/
'use strict';
LazyHacker.controller('SourcesController', ['$scope', 'GithubService', function($scope, GithubService) {
    $scope.showThanks = false;

    $scope.handleGithubSubmit = function() {
        localStorage.setItem('githubUsername', this.githubUsername);
        $scope.showThanks = true;
        setTimeout(function() {
            window.close();
        }, 1000);
    };

    $scope.requestBookmarkPermissions = function() {
        chrome.permissions.request({
            permissions: ['bookmarks']
        }, function(granted) {
            if(granted) {
                $scope.bookmarkMessage = 'Cool!';
            } else {
                $scope.bookmarkMessage = ':(';
            }
        });
    };

}]);
