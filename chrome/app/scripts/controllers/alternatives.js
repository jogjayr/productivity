'use strict';
LazyHacker.controller('AlternativesController', ['$scope', 'GithubService', 'BookmarkService', 
    function($scope, GithubService, BookmarkService) {
    var serviceReturnVal = GithubService.getGithubStarred();
    var urlParams = document.location.search;
    urlParams = urlParams.replace('?', '');
    urlParams = urlParams.split('=');

    var itemTypeToService = {
        'repo': GithubService,
        'bookmark': BookmarkService
    };

    //this is bad design. the controller shouldn't have
    //to care about the type of data returned by the
    //service and handle it differently.
    //TODO: REFACTOR
    if(typeof serviceReturnVal.success == 'function') {
        //if there's no cached data yet, the service
        //returns a promise and the returned data is an
        //array. it can be stored on the scope directly
        serviceReturnVal.success(function(data) {
            $scope.githubStarred = data;
        });
    } else {
        $scope.githubStarred = serviceReturnVal;
    }

    $scope.recentBookmarks = BookmarkService.getRecentBookmarks();
    
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

    $scope.notInterested = function(item, type) {
        item.interested = false;
        var service = itemTypeToService[type];
        service.setInterest(item.id, false);
    };
}]);
