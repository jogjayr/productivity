'use strict';

var LazyHacker = angular.module('LazyHacker', {});



LazyHacker.controller('OnboardController', function($scope) {
    $scope.banned = [{
        name: 'Facebook',
        hostname: 'facebook.com'
    }, {
        name: 'Twitter',
        hostname: 'twitter.com'
    }, {
        name: 'Tumblr',
        hostname: 'tumblr.com'
    }];

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
    };



    function buildRules(hosts) {
        return hosts.map(function(host) {
            return {
                hostSuffix: host.hostname
            };
        });
    }
});