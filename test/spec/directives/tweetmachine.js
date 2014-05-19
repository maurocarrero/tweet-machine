'use strict';

describe('Directive: tweetMachine', function () {

  // load the directive's module
  beforeEach(module('tweetMachineApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tweet-machine></tweet-machine>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tweetMachine directive');
  }));
});
