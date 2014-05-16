'use strict';

angular.module('tweetMachineApp')
  .controller('MainCtrl', function ($scope, $window) {


    function reflow() {
    	var tweets = $window.document.getElementsByClassName('tweet'),
    		tweetsLength = tweets.length,
    		opacity = 100 / tweetsLength;

    	angular.forEach(tweets, function (tweet, $index) {
    		var styles = $window.getComputedStyle(tweet),
    			idx = $index + 1,
    			margin = idx * 40,
    			thisOpacity = idx * opacity;

    		// tweet.style.zIndex = idx;
    		//tweet.style.marginTop += margin + 'px';
    		tweet.style.opacity = idx === tweetsLength ? '1' : '0.' + thisOpacity;
    		tweet.style.webkitTransform = 'scale(1.' + idx + ')';
    		tweet.style.webkitTransform += ' translateY('+ idx*30 +'px)';
    	});
    }

    reflow();

  	$scope.nextTweet = function () {
  		var tweets = $window.document.getElementsByClassName('tweet'),
          tweetsContainer = tweets[0].parentNode;
      tweetsContainer.insertBefore(tweetsContainer.firstChild, tweetsContainer.lastChild);
      reflow();
  	};

  	$scope.prevTweet = function () {
  		console.log('prev');
  	};

  });
