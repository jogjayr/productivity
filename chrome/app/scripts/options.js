'use strict';

LazyHacker.controller('OnboardController', function($scope, OnboardService) {
    OnboardService.getBanned().success(function(data) {
        $scope.banned = data;
    });

    $scope.saveBanned = function() {
        chrome.runtime.sendMessage({
            action: "saveBanned",
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

    $scope.selectWhat = 'All';
    $scope.toggleSelectAll = function() {
        OnboardService.toggleSelectAll($scope);
    };
});

LazyHacker.service('OnboardService', function($http) {
    this.getBanned = function() {
        return $http.get('/data/banned.json');
    };

    this.buildRules = function(hosts) {
        return hosts.map(function(host) {
            return {
                hostSuffix: host.hostname
            };
        });
    };

    var allSelected = false;
    this.toggleSelectAll = function(context) {
        context.selectWhat = allSelected ? 'All' : 'None';
        allSelected = !allSelected;
        context.banned.map(function(site) {
            site.checked = allSelected;
        });
    };
});
