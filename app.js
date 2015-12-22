var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function flipCoin() {
  // Either 3 or 2 returned
  var num = Math.floor(Math.random() * (3 - 2 + 1)) + 2;
  return num === 3 ? "Heads" : "Tails";
};

app.post('/', function (req, res) {

  var side = flipCoin();

  res.json({
    response_type: "in_channel",
    attachments: [
      {
        "text": side,
        "image_url": `https://s3-us-west-2.amazonaws.com/doctrines.co.attachments/${side.toLowerCase()}.jpg`,
        "color": "#000000"
      }
    ]
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Slack coin flip listening at http://%s:%s', host, port);
});
