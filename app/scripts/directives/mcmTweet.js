'use strict';

angular.module('tweetMachineApp')
  .directive('mcmTweet', function () {
    return {
      templateUrl: 'views/partials/mcmTweet.html',
      restrict: 'E',
      replace: true
    };
  });
