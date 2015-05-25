'use strict';
LazyHacker.controller('AlternativesController', ['$scope', 'GithubService', function($scope, GithubService) {
    var username = localStorage.getItem('githubUsername');

    GithubService.getGithubStarred(username).success(function(data) {
        $scope.githubStarred = data;
    });

    var urlParams = document.location.search;
    urlParams = urlParams.replace('?', '');

    urlParams = urlParams.split('=');
    if(urlParams[0] === 'slacker_dest'){
        $scope.slackerDest = urlParams[1];
    }

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
