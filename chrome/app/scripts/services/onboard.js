LazyHacker.service('OnboardService', function($http) {
    this.getBanned = function() {
        return $http.get('/data/banned.json');
    };

    this.buildRules = function(hosts) {
        return hosts.map(function(host) {
            return {
                hostSuffix: host.hostname
            };
        });
    };

    var allSelected = true;
    this.toggleSelectAll = function(context) {
        context.selectWhat = allSelected ? 'All' : 'None';
        allSelected = !allSelected;
        context.banned.map(function(site) {
            site.checked = allSelected;
        });
    };
});
