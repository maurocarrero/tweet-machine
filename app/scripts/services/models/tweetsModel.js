/**

  TWITTER Application-only authentication
  a. Twitter issue authenticated requests on behalf of the application itself.
  b. You don't have the context of an authenticated user and this means that any
  request to API for endpoints that require user context, such as posting tweets,
  will not work.

  Auth Flow - steps:
  1. An application encodes its consumer key and secret into a specially encoded set of credentials.
  2. An application makes a request to the POST oauth2/token endpoint to exchange these credentials for a bearer token.
  3. When accessing the REST API, the application uses the bearer token to authenticate.

  app/config.json structure:

  {
    "apiKey" : "averystrangequantityofchars",
    "apiSecret" : "averystrangeandlongerquantityofchars"
  }

  Troubleshooting: It is possible that the request fails because of CORS,
                   please try testing the app in incognito mode (Chrome).

**/

'use strict';

angular.module('tweetMachineApp')
  .service('tweetsModel', ['$http', '$q', '$cacheFactory', function ($http, $q, $cacheFactory) {

    var tweetsCache = $cacheFactory('tweets');
    
    return {
      get: function () {
        var deferred = $q.defer(),
          data = tweetsCache.get('tweets');
        if (!data) {
          console.log("FROM REQUEST");
          $http.get('http://localhost:8888/tweets').then(function (response) {
            tweetsCache.put('tweets', response.data);
            deferred.resolve(response.data);
          }, function (error) {
            deferred.reject(error);
          });
        } else {
          console.log("FROM CACHE");
          deferred.resolve(data);
        }
        return deferred.promise;
      }
    };
  }]);
