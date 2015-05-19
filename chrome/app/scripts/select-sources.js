LazyHacker.controller('SourcesController', ['$scope', 'SourcesService', function($scope, SourcesService) {
    $scope.handleGithubSubmit = function() {
        SourcesService.getGithubStarred(this.githubUsername).success(function(data) {
            console.log(data);
        });
    };
}]);

LazyHacker.service('SourcesService', ['$http', function($http) {

    this.getGithubStarred = function(username) {
        return $http.get('https://api.github.com/users/' + username + '/starred');
    };

}]);