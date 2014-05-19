'use strict';

angular.module('tweetMachineApp')
  .directive('mcmTweetMachine', function (tweetsModel, $window) {
    return {
      templateUrl: 'views/partials/mcmTweetMachine.html',
      restrict: 'E',
      replace: true,
      controller: function ($scope, $element) {

        $scope.tweets = tweetsModel.get();

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

        $scope.nextTweet = function () {
          var machine = $element[0];
          
          machine.removeTextNodes();

          machine.insertBefore(machine.firstChild, machine.lastChild.nextSibling);
          reflow();
        };

        $scope.prevTweet = function () {
          var machine = $window.document.getElementsByClassName('machine')[0];

          machine.removeTextNodes();

          machine.insertBefore(machine.lastChild, machine.firstChild);
          reflow();

          
        };

        // INIT
        reflow();

        this.addTweet = function (tweet) {
          $scope.tweets.push(tweet);
        }
      },
      link: function postLink (scope, element, attrs) {
        console.log(scope.tweets);
      }
    };
  });
