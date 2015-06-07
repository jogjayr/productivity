'use strict';
LazyHacker.service('LocalStorage', function() {
    this.setObject = function(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    };

    //
    this.getObject = function(key) {
        var obj = localStorage.getItem(key);
        if (obj) {
            return JSON.parse(obj);
        }
        return false;
    };

    this.getSyncedObject = function(key) {
        var obj = this.getObject(key);
        var self = this;
        obj = obj || {};

        Object.observe(obj, function() {
            self.setObject(key, obj);
        });
        return obj;
        
    };
});
