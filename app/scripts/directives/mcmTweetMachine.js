'use strict';

angular.module('tweetMachineApp')
  .directive('mcmTweetMachine', function (tweetsModel, $window) {
    return {
      templateUrl: 'views/partials/mcmTweetMachine.html',
      restrict: 'E',
      replace: true,
      controller: function ($scope) {

        $scope.tweets = tweetsModel.get();

        function reflow() {
          var tweets = $window.document.getElementsByClassName('tweet'),
            tweetsLength = tweets.length,
            opacity = parseInt(100 / tweetsLength, 10),
            separation = parseInt(100 / tweetsLength, 10);

          angular.forEach(tweets, function (tweet, $index) {
            var idx = $index + 1,
              thisOpacity = idx * opacity,
              scale = idx < 10 ? idx / 10 : idx,
              separation = 20;

            tweet.style.opacity = (idx === tweetsLength) ? '1' : '0.' + thisOpacity;
            tweet.style.webkitTransform = 'translateY(' + (idx * separation) + 'px) scale(1.' + scale + ')';
          });
        }

        $scope.nextTweet = function () {
          var machine = $window.document.getElementsByClassName('machine')[0];

          // REMOVES TEXT NODES FROM NODE LIST
          angular.forEach(machine.childNodes, function (node) {
            if (node.nodeType !== 1) {
              machine.removeChild(node);
            }
          });

          machine.insertBefore(machine.lastChild, machine.firstChild);
          reflow();
        };

        $scope.prevTweet = function () {
          var machine = $window.document.getElementsByClassName('machine')[0];

          // REMOVES TEXT NODES FROM NODE LIST
          angular.forEach(machine.childNodes, function (node) {
            if (node.nodeType !== 1) {
              machine.removeChild(node);
            }
          });

          machine.insertBefore(machine.firstChild, machine.lastChild.nextSibling);
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
