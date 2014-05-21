'use strict';

angular.module('tweetMachineApp')
  .service('tweetsModel', ['$q', '$http', function ($q, $http) {
    var service = {}, 
      tweetsCache = [],
      urls = {
        userTimeline: 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=10&screen_name=twitterapi',
        search: 'https://api.twitter.com/1.1/search/tweets.json?q=macklemore&result_type=mixed&count=10'
      },

      // GET CREDENTIALS FROM A config.json FILE
      getCredentials = function () {
        return $http.get('config.json').then(function (response) {
          var apiKey = encodeURI(response.data.apiKey),
            apiSecret = encodeURI(response.data.apiSecret);
          return btoa(apiKey + ':' + apiSecret);
        });
      },

      getToken = function (credentials) {
        return $http({
          url: 'https://api.twitter.com/oauth2/token',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic ' + credentials
          },
          data: 'grant_type=client_credentials'
        }).then(function (response) {
          return response.data.access_token;
        });
      },

      sendRequest = function (url, token) {
        return $http({
          url: url,
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(function (response) {
          tweetsCache = response.data.statuses;
          return tweetsCache;
        });
      };

    service.get = function () {
      return getCredentials().then(function (credentials) {
        return getToken(credentials).then(function (token) {
          return sendRequest(urls.search, token);
        });
      });
    }

    return service;
  }]);
