'use strict';

LazyHacker.factory('storeGithubInfo', ['LocalStorage', '_', function(LocalStorage, _) {
    //interceptor service
    //intercepts responses from Github starred API calls, and stores in localstorage
    return {
        response: function(response) {
            var cachedInfo = LocalStorage.getSyncedObject('githubStarred');
            var responseData = response.data;
       
            try {
                for (var repo of responseData) {
                    if(!cachedInfo[repo.id]) {
                        cachedInfo[repo.id] = {
                            name: repo.name,
                            html_url: repo.html_url,
                            description: repo.description,
                            stargazers_count: repo.stargazers_count,
                            id: repo.id,
                            interested: true
                        };
                    } else {
                        repo.interested = cachedInfo[repo.id].interested;
                    }
                }
                // LocalStorage.setObject('githubStarred', cachedInfo);
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
        var githubStarredObj = LocalStorage.getObject('githubStarred');
        if(githubStarredObj) {
            var githubStarred = [];
            for (var repoId in githubStarredObj) {
                githubStarred.push(githubStarredObj[repoId]);
            }
            return githubStarred;
        } else {
            return $http.get('https://api.github.com/users/' + username + '/starred', {cache: true});
        }
    };
    this.repoVisited = function(repoId) {
    
    };
    this.setInterest = function(repoId, hasInterest) {
        var cachedInfo = LocalStorage.getSyncedObject('githubStarred');
        var repoCopy = {};
        if(cachedInfo[repoId]) {
            Object.assign(repoCopy, cachedInfo[repoId]);
            repoCopy.interested = false;
            cachedInfo[repoId] = repoCopy;
        }
    };
    this.setUsername = function(username) {
        localStorage.setItem('githubUsername', username);
    };

    this.getUsername = function() {
        return localStorage.getItem('githubUsername');
    };
}]);


LazyHacker.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('storeGithubInfo');
}]);
