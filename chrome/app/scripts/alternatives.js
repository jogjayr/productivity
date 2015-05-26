'use strict';
LazyHacker.controller('AlternativesController', ['$scope', 'GithubService', 'BookmarkService', 
    function($scope, GithubService, BookmarkService) {
    var serviceReturnVal = GithubService.getGithubStarred();

    if(typeof serviceReturnVal.success == 'function') {
        serviceReturnVal.success(function(data) {
            $scope.githubStarred = data;
        });
    } else {
        $scope.githubStarred =[];
        for (var repoId in serviceReturnVal) {
            $scope.githubStarred.push(serviceReturnVal[repoId])
        }
    }

    var bookmarks = BookmarkService.getRecentBookmarks();


    var urlParams = document.location.search;
    urlParams = urlParams.replace('?', '');

    urlParams = urlParams.split('=');
    if(urlParams[0] === 'slacker_dest'){
        $scope.slackerDest = urlParams[1];
    }
    $scope.hasDest = $scope.slackerDest ? true: false;

    $scope.procrastinateAnyway = function() {
        chrome.runtime.sendMessage({
            action: 'allowSlackingOff',
            url: $scope.slackerDest
        }, function(success) {
            if(success) {
                chrome.tabs.getCurrent(function(tabData) {
                    chrome.tabs.update(tabData.id, {
                        url: '/select-sources.html'
                    });
                });
            }
        });
    };

    $scope.notInterested = function(repo) {
        repo.interested = false;
        GithubService.setInterest(repo.id, false);
    };
}]);
