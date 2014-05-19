'use strict';

angular.module('tweetMachineApp')
  .service('tweetsModel', function () {
  	var service = {}, tweets;

  	service.get = function () {
  		tweets = [{
	  			title: 'Tweet one',
	  			content: 'The content of the first tweet.',
	  			timestamp: 'Today'
	  		}, {
	  			title: 'Tweet two',
	  			content: 'The content of the second tweet.',
	  			timestamp: 'Yesterday'
	  		}, {
	  			title: 'Tweet three',
	  			content: 'The content of the third tweet.',
	  			timestamp: 'The before yesterday'
	  		}, {
	  			title: 'Tweet four',
	  			content: 'The content of the fourth tweet.',
	  			timestamp: 'Before before Yesterday'
	  		}, {
	  			title: 'Tweet five',
	  			content: 'The content of the fifth tweet.',
	  			timestamp: 'Before before before Yesterday'
	  		}, {
	  			title: 'Tweet six',
	  			content: 'The content of the sixth tweet.',
	  			timestamp: 'Before before before before Yesterday'
	  		}, {
	  			title: 'Tweet seven',
	  			content: 'The content of the seventh tweet.',
	  			timestamp: 'Before before before before before Yesterday'
	  		}, {
	  			title: 'Tweet one',
	  			content: 'The content of the first tweet.',
	  			timestamp: 'Today'
	  		}, {
	  			title: 'Tweet two',
	  			content: 'The content of the second tweet.',
	  			timestamp: 'Yesterday'
	  		}, {
	  			title: 'Tweet three',
	  			content: 'The content of the third tweet.',
	  			timestamp: 'The before yesterday'
	  		}, {
	  			title: 'Tweet four',
	  			content: 'The content of the fourth tweet.',
	  			timestamp: 'Before before Yesterday'
	  		}, {
	  			title: 'Tweet five',
	  			content: 'The content of the fifth tweet.',
	  			timestamp: 'Before before before Yesterday'
	  		}, {
	  			title: 'Tweet six',
	  			content: 'The content of the sixth tweet.',
	  			timestamp: 'Before before before before Yesterday'
	  		}, {
	  			title: 'Tweet seven',
	  			content: 'The content of the seventh tweet.',
	  			timestamp: 'Before before before before before Yesterday'
	  		}
	  	];

  		return tweets;
  	}

    return service;
  });
