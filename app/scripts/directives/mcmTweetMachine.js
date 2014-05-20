'use strict';

angular.module('tweetMachineApp')
  .directive('mcmTweetMachine', function (tweetsModel, $window, $timeout) {
    return {
      templateUrl: 'views/partials/mcmTweetMachine.html',
      restrict: 'E',
      replace: true,
      link: function postLink (scope, element) {
        var machine;

        function reflow() {
          var tweets = $window.document.getElementsByClassName('tweet'),
            tweetsLength = tweets.length,
            opacity = 100 / tweetsLength,
            separation = 100 / tweetsLength;

          angular.forEach(tweets, function (tweet, $index) {
            var idx = $index + 1,
              thisOpacity = ('' + (opacity / 100)).split('.')[1],
              scale = ('' + (idx / 100)).split('.')[1];

            tweet.style.opacity = (idx === tweetsLength) ? '1' : '0.' + thisOpacity;
            tweet.style.webkitTransform = 'translateY(' + (idx * separation) + 'px) scale(1.' + scale + ')';
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
        
        // INIT
        tweetsModel.get().then(function(tweets) {
          machine = element[0];
          scope.tweets = tweets;
          $timeout(function () {

            // REFACTOR: Something's wrong here, a couple of text nodes require 
            // to parse the list more than once
            // I suppose that being Angular comments, they are being injected after render...
            machine.removeTextNodes();
            machine.removeTextNodes();
            machine.removeTextNodes();

            reflow();
          }, 500);

        });

        tweetsModel.peteco();
      }
    };
  });
