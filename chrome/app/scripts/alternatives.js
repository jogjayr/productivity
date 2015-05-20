LazyHacker.controller('AlternativesController', ['$scope', 'GithubService', function($scope, GithubService) {
    var username = localStorage.getItem('githubUsername');

    GithubService.getGithubStarred(username).success(function(data) {
        $scope.githubStarred = data;
    });

}]);