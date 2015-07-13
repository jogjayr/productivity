'use strict';

var exceptions = new Set();
var EXCEPTION_TIMEOUT = 1000 * 60 * 2; //2 minutes exception
function getHostname(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.hostname;
}

function showAlternatives(e) {
    //block navigation if
    //this is the top level frame AND the hostname isn't on the exceptions list
    if (e.parentFrameId !== 0 && !exceptions.has(getHostname(e.url))) {
        // console.log(e);
        chrome.tabs.update(e.tabId, {
            url: '/alternatives.html?slacker_dest=' + e.url
        });
    }
}

function expireException (hostname) {
    //result is false if hostname is not in exceptions
    //true if hostname is in exceptions and removed
    var result = exceptions.delete(hostname);
}

chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.create({
        url: '/welcome.html'
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        // console.log(request, sender, sendResponse);
        if (request.action === 'saveBanned') {
            chrome.webNavigation.onBeforeNavigate.addListener(showAlternatives, {
                url: request.rules
            });
            sendResponse(true);
        } else if (request.action === 'allowSlackingOff') {
            var exceptionHostname = getHostname(request.url);
            exceptions.add(exceptionHostname);
            //TODO: Remove timeout or do something else with it
            // setTimeout(function() {
            //     expireException(exceptionHostname);
            // }, EXCEPTION_TIMEOUT);
        }
    });
});
