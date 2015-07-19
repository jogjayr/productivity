'use strict';

LazyHacker.controller('OnboardController', function($scope, OnboardService) {
    OnboardService.getBanned().success(function(data) {
        $scope.banned = data;
        for (var i = 0; i < $scope.banned.length; i++) {
            $scope.banned[i].checked = true;
        }
        $scope.selectWhat = 'None';
    });

    $scope.saveBanned = function() {
        chrome.runtime.sendMessage({
            action: 'saveBanned',
            rules: OnboardService.buildRules($scope.banned)
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
    
    $scope.toggleSelectAll = function() {
        OnboardService.toggleSelectAll($scope);
    };
});
