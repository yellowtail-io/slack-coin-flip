var Botkit = require('botkit'),
    controller = Botkit.slackbot();

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

controller.configureSlackApp({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  scopes: ['commands']
});

controller.setupWebserver(process.env.PORT, function(err, webserver) {

  console.log("Starting Coin Flip at ", process.env.PORT);

  webserver.get('/',function(req,res) {
    res.send("Welcome!");
  });

  webserver.post('/', function(req, res) {
    res.json({
      response_type: "in_channel",
      attachments: [ flipCoin() ]
    });
  });

  controller.createOauthEndpoints(controller.webserver, function(err,req,res) {
    if (err) {
      res.status(500).send('ERROR: ' + err);
    } else {
      res.send('Success!');
    }
  });

});
