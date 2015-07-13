/* global describe, it */


'use strict';
describe('GithubService', function() {
    beforeEach(module('LazyHacker'));

    it('expectation', inject(function($service) {
        var GithubService = $service('GithubService');
        expect(2).to.equal(2);
    });
});
