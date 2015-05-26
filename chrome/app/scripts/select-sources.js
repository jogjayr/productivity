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

        PermissionsService.hasBookmarksPermission(function(hasPermission) {
            $scope.bookmarkPermission.show = !hasPermission;
            $scope.$apply();
        });

        $scope.handleGithubSubmit = function() {
            GithubService.setUsername(this.githubUsername);
            $scope.showThanks = true;
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
                    $scope.bookmarks.message = 'I understand if you\'re not ready for this yet. You can always change your mind later';
                    $scope.bookmarks.show = true;
                }
                $scope.$apply();
            });
        };

    }
]);
