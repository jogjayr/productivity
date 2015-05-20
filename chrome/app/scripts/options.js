'use strict';

LazyHacker.controller('OnboardController', function($scope, OnboardService) {
    OnboardService.getBanned().success(function(data) {
        $scope.banned = data;
    });

    $scope.saveBanned = function() {
        OnboardService.saveBanned(this.banned);
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

    var allSelected = false;

    function buildRules(hosts) {
        return hosts.map(function(host) {
            return {
                hostSuffix: host.hostname
            };
        });
    }
    this.saveBanned = function(banned) {
        var rules = buildRules(banned.filter(function(site) {
            return site.checked;
        }));
        chrome.webNavigation.onBeforeNavigate.addListener(function(e) {
            //ensures no nav takes place if forbidden iframe exists
            if (e.parentFrameId !== 0) {
                console.log(e);
                chrome.tabs.update(e.tabId, {
                    url: '/alternatives.html'
                });
            }
        }, {
            url: rules
        });

        chrome.tabs.getCurrent(function(tabData) {
            chrome.tabs.update(tabData.id, {
                url: '/select-sources.html'
            });
        });
    };

    this.toggleSelectAll = function(context) {
        context.selectWhat = allSelected ? 'All' : 'None';
        allSelected = !allSelected;
        context.banned.map(function(site) {
            site.checked = allSelected;
        });
    };
});
