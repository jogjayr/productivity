'use strict';
LazyHacker.service('GithubService', ['$http', function($http) {
    this.getGithubStarred = function(username) {
        return $http.get('https://api.github.com/users/' + username + '/starred');
    };
}]);
