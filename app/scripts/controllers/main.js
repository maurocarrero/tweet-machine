'use strict';

angular.module('tweetMachineApp')
  .controller('MainCtrl', function ($scope, $window) {
    
  	var tweets = $window.document.getElementsByClassName('tweet'),
  		tweetsLength = tweets.length,
  		opacity = 100 / tweetsLength;

  	angular.forEach(tweets, function (tweet, $index) {
  		var styles = $window.getComputedStyle(tweet),
  			idx = $index + 1,
  			margin = idx * 40,
  			thisOpacity = idx * opacity;

  		tweet.style.zIndex = idx;
  		tweet.style.marginTop += margin + 'px';
  		tweet.style.opacity = idx === tweetsLength ? '1' : '0.' + thisOpacity;
  		tweet.style.webkitTransform = 'scale(1.' + idx + ')';
  	});

  	$scope.nextTweet = function () {
  		console.log('next');  		
  	};

  	$scope.prevTweet = function () {
  		console.log('prev');
  	};

  });
