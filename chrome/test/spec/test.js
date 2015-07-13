/* global describe, it */

console.log('here');
'use strict';
describe('GithubService', function() {
    var GithubService;
    beforeEach(module('LazyHacker'));
    beforeEach(inject(function(_GithubService_) {
        GithubService = _GithubService_;
    }));
    describe('Something else',function () {
        it('should expose the API expected', function () {
            expect(GithubService).to.have.property('getGithubStarred');
            expect(GithubService).to.have.property('repoVisited');
            expect(GithubService).to.have.property('setInterest');
            expect(GithubService).to.have.property('setUsername');
            expect(GithubService).to.have.property('getUsername');

        });
        it('expectation', function() {

        });
    });
});
