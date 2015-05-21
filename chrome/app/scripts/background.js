'use strict';

// var EXTENSION_ID = chrome.runtime.id;
// var forbiddenHosts = ['facebook.com', 'twitter.com', 'pinterest.com', 'quora.com'];


chrome.runtime.onInstalled.addListener(function(details) {
    chrome.tabs.create({
        url: '/options.html'
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log(request, sender, sendResponse);
        if(request.action === 'saveBanned') {
            chrome.webNavigation.onBeforeNavigate.addListener(function(e) {
                //ensures no nav takes place if forbidden iframe exists
                if (e.parentFrameId !== 0) {
                    console.log(e);
                    chrome.tabs.update(e.tabId, {
                        url: '/alternatives.html'
                    });
                }
            }, {
                url: request.rules
            });
            sendResponse(true);
        }
    });
});