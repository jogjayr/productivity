'use strict';

var EXTENSION_ID = chrome.runtime.id;
var forbiddenHosts = ['facebook.com', 'twitter.com', 'pinterest.com', 'quora.com'];

function buildRules(hosts) {
    return hosts.map(function(host) {
        return {
            hostSuffix: host
        };
    });
}

chrome.runtime.onInstalled.addListener(function(details) {
    var rules = buildRules(forbiddenHosts);
    chrome.webNavigation.onBeforeNavigate.addListener(function(e) {
        //ensures no nav takes place if forbidden iframe exists
        if (e.parentFrameId !== 0) {
            console.log(e);
            chrome.tabs.update(e.tabId, {url: '/alternatives.html'});
        }
    }, {
        url: rules
    });

    chrome.tabs.create({
        url: '/options.html'
    })
});
