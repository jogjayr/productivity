LazyHacker.controller('SourcesController', ['$scope', 'GithubService', function($scope, GithubService) {
    $scope.showThanks = false;
    $scope.handleGithubSubmit = function() {
        localStorage.setItem('githubUsername', this.githubUsername);
        $scope.showThanks = true;
        setTimeout(function() {
            window.close();
        }, 1000);
    };
}]);
