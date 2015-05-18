'use strict';
var timesCalled = 0;

var forbiddenHosts = ['facebook.com', 'twitter.com', 'pinterest.com', 'quora.com'];

function buildRules(hosts) {
    return hosts.map(function(host) {
        return {
            hostSuffix: host
        };
    });
}

chrome.runtime.onInstalled.addListener(function(details) {
    console.log('previousVersion', details.previousVersion);
    var rules = buildRules(forbiddenHosts);
    chrome.webNavigation.onBeforeNavigate.addListener(function(e) {
        console.log('You just went to Google' + timesCalled);
        timesCalled++;
    }, {
        url: rules
    });
});

// chrome.tabs.onUpdated.addListener(function (tabId) {
//   chrome.pageAction.show(tabId);
// });