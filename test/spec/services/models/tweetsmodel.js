'use strict';

describe('Service: ModelsTweetsmodel', function () {

  // load the service's module
  beforeEach(module('tweetMachineApp'));

  // instantiate service
  var ModelsTweetsmodel;
  beforeEach(inject(function (_ModelsTweetsmodel_) {
    ModelsTweetsmodel = _ModelsTweetsmodel_;
  }));

  it('should do something', function () {
    expect(!!ModelsTweetsmodel).toBe(true);
  });

});
