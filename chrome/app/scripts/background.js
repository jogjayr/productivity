'use strict';

// var EXTENSION_ID = chrome.runtime.id;
// var forbiddenHosts = ['facebook.com', 'twitter.com', 'pinterest.com', 'quora.com'];


chrome.runtime.onInstalled.addListener(function(details) {
    chrome.tabs.create({
        url: '/options.html'
    })
});
