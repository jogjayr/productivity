'use strict';

LazyHacker.controller('OnboardController', function($scope, OnboardService) {
    OnboardService.getBanned().success(function(data) {
        $scope.banned = data;
    });

    $scope.saveBanned = function() {
        var rules = buildRules(this.banned.filter(function(site) {
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
            chrome.tabs.update(tabData.id, {url: '/select-sources.html'});
        })
    };



    function buildRules(hosts) {
        return hosts.map(function(host) {
            return {
                hostSuffix: host.hostname
            };
        });
    }
    var allSelected = false;
    $scope.selectWhat = 'All';
    $scope.toggleSelectAll = function() {
        this.selectWhat = allSelected ? 'All' : 'None';
        allSelected = !allSelected;
        this.banned.map(function(site) {
            site.checked = allSelected;
        });
    };
});

LazyHacker.service('OnboardService', function($http) {
    this.getBanned = function() {
        return $http.get('/data/banned.json');
    };
});