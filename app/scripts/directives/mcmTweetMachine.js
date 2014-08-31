'use strict';

angular.module('tweetMachineApp')
  .directive('mcmTweetMachine', ['tweetsModel', '$window', '$timeout', function (tweetsModel, $window, $timeout) {
    return {
      templateUrl: 'views/partials/mcmTweetMachine.html',
      restrict: 'E',
      replace: true,
      scope: {},
      link: function postLink (scope, element) {
        var machine,
          map = Array.prototype.map,

          enableBothButtons = function () {
            scope.enableNext = true;
            scope.enablePrev = true;
          };

        function reflow() {
          var tweets = $window.document.getElementsByClassName('tweet'),
            tweetsLength = tweets.length,
            opacity = 1 / tweetsLength,
            separation = 450 / tweetsLength,
            scale = 1 / tweetsLength;

          angular.forEach(tweets, function (tweet, $index) {
            var idx = $index + 1;

            tweet.style.opacity = opacity * idx;
            tweet.style.webkitTransform = 'translateY(' + ($index * separation) + 'px) scale(' + (scale * idx) + ')';
          });
        }

        function prepareTweets() {
          var tweets = $window.document.getElementsByClassName('tweet');

          machine.firstChild.setAttribute('the-last', true);
          machine.firstChild.nextSibling.setAttribute('the-first', true);

          map.call(tweets, function (tweet) {
            var bgImage = tweet.getAttribute('data-bg-image'),
              bgColor = tweet.getAttribute('data-bg-color'),
              bgRepeat = tweet.getAttribute('data-bg-repeat'),
              borderColor = tweet.getAttribute('data-border-color'),
              fontColor = tweet.getAttribute('data-font-color');
            
            if (bgImage) {
              tweet.style.backgroundImage = 'url(' + bgImage + ')';
              tweet.style.backgroundPosition = 'bottom';
              tweet.style.backgroundRepeat = (bgRepeat) ? 'repeat' : 'no-repeat';
            }
            if (bgColor) {
              tweet.style.backgroundColor = '#' + bgColor;
            }
            tweet.style.borderColor = (borderColor) ? '#' + borderColor : '#343434';
            tweet.style.color = (fontColor) ? '#' + fontColor : '#343434';
          });
        }


        scope.prevTweet = function () {
          if (!machine.firstChild.getAttribute('the-last')) {
            machine.insertBefore(machine.firstChild, machine.lastChild.nextSibling);
            reflow();
            scope.enableNext = true;
          } else {
            scope.enableNext = true;
            scope.enablePrev = false;
          }
        };
        
        scope.nextTweet = function () {
          if (!machine.firstChild.getAttribute('the-first')) {
            machine.insertBefore(machine.lastChild, machine.firstChild);
            reflow();
            scope.enablePrev = true;
          } else {
            scope.enableNext = false;
            scope.enablePrev = true;
          }
        };

        scope.enaablePrev = false;
        scope.enableNext = false;

        // INIT
        tweetsModel.get().then(function(tweets) {
          machine = angular.element(element[0]).children()[1];
          tweets = tweets.reverse();
          scope.tweets = tweets;
          scope.enableNext = true;
          $timeout(function () {
            machine.removeTextNodes();
            prepareTweets();
            reflow();
          });
        }, function (error) {
          console.log('Something went wrong with the request, below the error:');
          console.log(error);
        });
      }
    };
  }]);
