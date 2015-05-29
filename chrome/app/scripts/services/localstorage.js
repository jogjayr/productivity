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
        return obj;
    };

    this.getSyncedObject = function(key) {
        var obj = this.getObject(key);

        if(obj) {
            Object.observe(obj, function() {
                localStorage.setItem(key, JSON.stringify(obj));
            });
            return obj;
        }
    };
});
