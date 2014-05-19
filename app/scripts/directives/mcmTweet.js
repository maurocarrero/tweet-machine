'use strict';

angular.module('tweetMachineApp')
  .directive('mcmTweet', function () {
    return {
      require: '^mcmTweetMachine',
      templateUrl: 'views/partials/mcmTweet.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs, machineCtrl) {
        
      }
    };
  });
