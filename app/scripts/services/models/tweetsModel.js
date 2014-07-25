'use strict';

angular.module('tweetMachineApp')
  .service('tweetsModel', ['$http', '$q', '$cacheFactory', function ($http, $q, $cacheFactory) {

    var tweetsCache = $cacheFactory('tweets'),

      correctDate = function (tweets) {
        return tweets.map(function (el) {
          el.created_at = new Date(el.created_at);
        });
      },

      paginate = function (tweets) {
        var allPages = { 1: [] }, currentPage = 1;
        tweets.map(function (el, idx) {
          this[currentPage].push(el);
          if ((idx + 1) % 10 === 0) {
            currentPage += 1;
            this[currentPage] = [];
          }
        }, allPages);
        return allPages;
      };

    return {
      get: function () {
        var deferred = $q.defer(),
          data = tweetsCache.get('tweets');
        if (!data) {
          $http.get('http://localhost:8888/tweets').then(function (response) {
            var tweets = response.data;
            correctDate(tweets);
            tweets = paginate(tweets);
            tweetsCache.put('tweets', tweets);
            deferred.resolve(tweets[1]);
          }, function (error) {
            deferred.reject(error);
          });
        } else {
          deferred.resolve(data);
        }
        return deferred.promise;
      }
    };
  }]);
