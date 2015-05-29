LazyHacker.service('BookmarkService', ['LocalStorage', function(LocalStorage) {
    this.getRecentBookmarks = function() {
        var recentBookmarksObj = LocalStorage.getObject('recentBookmarks');
        var recentBookmarks = [];
        for (var bookmarkId in recentBookmarksObj) {
            recentBookmarks.push(recentBookmarksObj[bookmarkId]);
        }
        return recentBookmarks;
    };

    this.updateRecentBookmarks = function() {
        //merge with recent bookmarks
        chrome.bookmarks.getRecent(20, function(data) {
            var recentBookmarks = LocalStorage.getSyncedObject('recentBookmarks');
            data.map(function(bookmark) {
                bookmark.interested = true;
                if(!recentBookmarks[bookmark.id]) {
                    recentBookmarks[bookmark.id] = bookmark;
                }
                
            });
        });
    };
    this.setInterest = function(bookmarkId, hasInterest) {
        var recentBookmarks = LocalStorage.getSyncedObject('recentBookmarks');
        if(recentBookmarks[bookmarkId]){
            var bookmarkCopy = {};
            //Temporary hack to handle the fact that Object.observe
            //doesn't work on objects within arrays, only on the array
            //itself
            Object.assign(bookmarkCopy, recentBookmarks[bookmarkId]);
            bookmarkCopy.interested = false;
            recentBookmarks[bookmarkId] = bookmarkCopy;
        }
    };
}]);
