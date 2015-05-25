'use strict';
LazyHacker.factory('storeGithubInfo', function() {
    return {
        response: function(response) {
            var cachedInfo = localStorage.getItem('githubStarred');
            cachedInfo = cachedInfo || '{}';
            var responseData = response.data;
       
            try {
                cachedInfo = JSON.parse(cachedInfo);
                for (var repo of responseData) {
                    if(!cachedInfo[repo.id]) {
                        cachedInfo[repo.id] = {
                            'name': repo.name,
                            'html_url': repo.html_url,
                            'description': repo.description,
                            'stargazers_count': repo.stargazers_count,
                            'interested': true
                        };
                    } else {
                        repo.interested = cachedInfo[repo.id].interested;
                    }
                }
                localStorage.setItem('githubStarred', JSON.stringify(cachedInfo));
            } catch(e) {
                //Do something
                console.log(e);
            } finally {
                return response;
            }
        }
    };
});

LazyHacker.service('GithubService', ['$http', function($http) {
    this.getGithubStarred = function(username) {
        return $http.get('https://api.github.com/users/' + username + '/starred', {cache: true});
    };
    this.repoVisited = function(repoId) {
    
    };
    this.setInterest = function(repoId, hasInterest) {
        var cachedInfo = localStorage.getItem('githubStarred');
        if(cachedInfo[repoId]) {
            cachedInfo[repoId].interested = hasInterest;
        }
    };
}]);


LazyHacker.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('storeGithubInfo');
}]);
