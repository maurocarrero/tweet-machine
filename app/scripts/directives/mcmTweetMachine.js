'use strict';

angular.module('tweetMachineApp')
  .directive('mcmTweetMachine', ['tweetsModel', '$window', '$timeout', function (tweetsModel, $window, $timeout) {
    return {
      templateUrl: 'views/partials/mcmTweetMachine.html',
      restrict: 'E',
      replace: true,
      link: function postLink (scope, element) {
        var machine;

        function reflow() {
          var tweets = $window.document.getElementsByClassName('tweet'),
            tweetsLength = tweets.length,
            opacity = 1 / tweetsLength,
            separation = 200 / tweetsLength,
            scale = 1 / tweetsLength;

          angular.forEach(tweets, function (tweet, $index) {
            var idx = $index + 1;

            tweet.style.opacity = opacity * idx;
            tweet.style.webkitTransform = 'translateY(' + (idx * separation) + 'px) scale(' + (scale * idx) + ')';
          });
        }

        scope.nextTweet = function () {
          machine.insertBefore(machine.firstChild, machine.lastChild.nextSibling);
          reflow();
        };

        scope.prevTweet = function () {
          machine.insertBefore(machine.lastChild, machine.firstChild);
          reflow();
        };
        
        scope.disablePrev = true;
        scope.disableNext = true;

        // INIT
        tweetsModel.get().then(function(tweets) {
          machine = element[0];
          scope.tweets = tweets;
          scope.disablePrev = false;
          scope.disableNext = false;
          $timeout(function () {
            // REFACTOR: Something's wrong here, a couple of text nodes require 
            // to parse the list more than once
            // I suppose that being Angular comments, they are being injected after render...
            machine.removeTextNodes();
            machine.removeTextNodes();
            machine.removeTextNodes();

            reflow();
          }, 500);
        }, function (error) {
          console.log('Something went wrong with the request, below the error:');
          console.log(error);
        });
      }
    };
  }]);
