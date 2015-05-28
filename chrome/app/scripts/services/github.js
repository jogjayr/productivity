'use strict';


LazyHacker.service('LocalStorage', function() {
    this.setObject = function(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    }
    this.getObject = function(key) {
        var obj = localStorage.getItem(key);
        if (obj) {
            return JSON.parse(obj);
        }
        return obj;
    };
});


LazyHacker.factory('storeGithubInfo', ['LocalStorage', function(LocalStorage) {
    //interceptor service
    //intercepts responses from Github starred API calls, and stores in localstorage
    return {
        response: function(response) {
            var cachedInfo = LocalStorage.getObject('githubStarred');
            cachedInfo = cachedInfo || {};
            var responseData = response.data;
       
            try {
                for (var repo of responseData) {
                    if(!cachedInfo[repo.id]) {
                        cachedInfo[repo.id] = {
                            'name': repo.name,
                            'html_url': repo.html_url,
                            'description': repo.description,
                            'stargazers_count': repo.stargazers_count,
                            'id': repo.id,
                            'interested': true
                        };
                    } else {
                        repo.interested = cachedInfo[repo.id].interested;
                    }
                }
                LocalStorage.setObject('githubStarred', cachedInfo);
            } catch(e) {
                //Do something
                console.log(e);
            } finally {
                return response;
            }
        }
    };
}]);

LazyHacker.service('GithubService', ['$http', 'LocalStorage', function($http, LocalStorage) {
    this.getGithubStarred = function(username) {
        username = username || this.getUsername();
        var githubStarred = LocalStorage.getObject('githubStarred');
        if(githubStarred) {
            return githubStarred;
        } else {
            return $http.get('https://api.github.com/users/' + username + '/starred', {cache: true});
        }
    };
    this.repoVisited = function(repoId) {
    
    };
    this.setInterest = function(repoId, hasInterest) {
        var cachedInfo = LocalStorage.getObject('githubStarred');
        if(cachedInfo[repoId]) {
            cachedInfo[repoId].interested = hasInterest;
        }
        LocalStorage.setObject('githubStarred', cachedInfo);
    };
    this.setUsername = function(username) {
        localStorage.setItem('githubUsername', username);
    };

    this.getUsername = function() {
        return localStorage.getItem('githubUsername');
    }
}]);


LazyHacker.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('storeGithubInfo');
}]);
