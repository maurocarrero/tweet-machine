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

var x = require("express"),
    http = require("request"),
    q = require("q");
    btoa = require("btoa");
    fs = require("fs"),
    config = "app/config.json",
    app = x(),
    tweetsCache = [],
    urls = {
      userTimeline: "https://api.twitter.com/1.1/statuses/user_timeline.json?count=10&screen_name=twitterapi",
      search: "https://api.twitter.com/1.1/search/tweets.json?q=suarez&result_type=popular&count=100"
    },
    credentials = "",
    apiKey = "", 
    apiSecret = "",
    token = "",

    // GET CREDENTIALS FROM A config.json FILE
    getCredentials = function () {
      var deferred = q.defer();
      if (credentials) {
        deferred.resolve(credentials);
      } else {
        fs.readFile(config, "utf8", function (error, data) {
          if (error) {
            deferred.reject(new Error(error));
          } else {
            data = JSON.parse(data);
            apiKey = encodeURI(data.apiKey);
            apiSecret = encodeURI(data.apiSecret);
            credentials = btoa(apiKey + ':' + apiSecret);
          
            deferred.resolve(credentials);
          }
        });
      }

      return deferred.promise;
    },

    getToken = function (credentials) {
      var deferred = q.defer(),
        options = {
          uri: "https://api.twitter.com/oauth2/token",
          method: "POST",    
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Authorization": "Basic " + credentials
          },
          form: {
            "grant_type": "client_credentials"
          }
        };

      if (token) {
        deferred.resolve(token);
      } else {
        http(options, function (error, response, body) {
          if (error) {
            deferred.reject(new Error(error));
          } else {
            token = (JSON.parse(body)).access_token;
            deferred.resolve(token);
          }
        });

      }
      return deferred.promise;
    };

    sendRequest = function (url, token) {
      var deferred = q.defer();
        options = {
          uri: url,
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };

      http(options, function (error, response, body) {
        if (error) {
          deferred.reject(error);
        } else {
          deferred.resolve((JSON.parse(body)).statuses);
        }
      });

      return deferred.promise;

    };


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/tweets", function (req, res) {
  getCredentials().then(function (credentials) {
    getToken(credentials).then(function (token) {
      sendRequest(urls.search, token).then(function (response) {
        res.send(response);
      });
    });
  }, function (error) {
    res.send(error);
  });
});

app.listen(8888);
