LazyHacker.service('PermissionsService', function() {
    this.requestBookmarkPermissions = function(callback) {
        chrome.permissions.request({
            permissions: ['bookmarks']
        }, callback);
    };

    this.hasBookmarksPermission = function(callback) {
        chrome.permissions.contains({
            permissions: ['bookmarks']
        }, callback);
    };
});