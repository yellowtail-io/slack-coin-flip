var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var attachmentData = {
  "heads": {
    text: "Heads",
    image_url: "https://s3-us-west-2.amazonaws.com/doctrines.co.attachments/heads.jpg",
    color: "#ff0000"
  },
  "tails": {
    text: "Tails",
    image_url: "https://s3-us-west-2.amazonaws.com/doctrines.co.attachments/tails.jpg",
    color: "#0000ff"
  }
};

function flipCoin() {
  var num = Math.floor(Math.random() * (3 - 2 + 1)) + 2; // Either 3 or 2 returned
  return num === 3 ? attachmentData["heads"] : attachmentData["tails"];
};

app.post('/', function (req, res) {
  res.json({
    response_type: "in_channel",
    attachments: [ flipCoin() ]
  });
});

app.get('/', function (req, res) {
  res.json("welcome");
});

app.get('/auth', function (req, res) {
  res.json("welcome, auth");
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Slack coin flip listening at http://%s:%s', host, port);
});
