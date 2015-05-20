LazyHacker.controller('SourcesController', ['$scope', 'GithubService', function($scope, GithubService) {
    $scope.handleGithubSubmit = function() {
        localStorage.setItem('githubUsername', this.githubUsername);
        GithubService.getGithubStarred(this.githubUsername).success(function(data) {
            console.log(data);
            $scope.githubStarred = data;
        });
    };
}]);
