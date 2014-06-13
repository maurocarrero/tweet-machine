var x = require("express"),
    http = require("request"),
    app = x();

var credentials = ""

app.get("/getTweets", function (req, res) {

  var response = http.post({
    url: 'https://api.twitter.com/oauth2/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': 'Basic ' + credentials
    },
    data: 'grant_type=client_credentials'
  });

  res.pipe(response);

});

app.listen(8888);
