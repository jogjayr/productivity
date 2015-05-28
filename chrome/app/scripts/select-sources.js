'use strict';
LazyHacker.controller('SourcesController', ['$scope', 'GithubService', 'PermissionsService',
    function($scope, GithubService, PermissionsService) {
        $scope.thanks = {
            show: true,
            message: ''
        };
        $scope.bookmarks = {
            show: true,
            message: ''
        };
        $scope.bookmarkPermission = {
            show: true,
            message: 'Show bookmarks when I need a distraction'
        };

        $scope.github = {
            submitted: false,
            username: GithubService.getUsername()
        };

        $scope.github.editUsername = !$scope.github.username;

        PermissionsService.hasBookmarksPermission(function(hasPermission) {
            $scope.bookmarkPermission.show = !hasPermission;
            $scope.$apply();
        });

        $scope.editGithubUsername = function() {
            this.github.editUsername = true;
        };

        $scope.handleGithubSubmit = function() {
            GithubService.setUsername(this.github.username);
            this.showThanks = true;
            this.github.submitted = true;
            this.github.editUsername = false;
        };

        $scope.finishOnboard = function() {
            setTimeout(function() {
                window.close();
            }, 1000);
        };

        $scope.getBookmarksPermission = function() {
            PermissionsService.requestBookmarkPermissions(function(granted) {
                if(granted) {
                    $scope.bookmarks.message = 'Awesome!';
                    $scope.bookmarks.show = true;
                    $scope.bookmarkPermission.show = false;
                } else {
                    $scope.bookmarks.message = 'I understand. You can always change your mind later';
                    $scope.bookmarks.show = true;
                }
                $scope.$apply();
            });
        };

    }
]);
