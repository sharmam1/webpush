var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const webPush = require('web-push');

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
var message = [
  {name: 'manish', message: 'hey hello'},
  {name: 'sharma', message: 'hey hello world'},
  {name: 'kumar', message: 'hey hello world1'},
]

var http = require('http');
var https = require('https');
var fs = require('fs');
var cors = require(‘cors’);

var options = {
 key: fs.readFileSync('key.pem'),
 cert: fs.readFileSync('cert.pem')
};


app.post('/messages', (req, res) => {
  console.log(req.body);
  message.push(req.body)
  res.sendStatus(200)
})

app.use(cors({origin: 'https://rde-517-msharma.us-east-1.int.timeinc.net'}));
app.post('/send/notifiction', (req, res) => {
  var fs = require('fs');
  var array = fs.readFileSync('sub.txt').toString().split("\r\n");
  const payload = req.body.title;
  console.log(payload);
  const options = {
    TTL: 5
  };

  for(i in array) {
    const subscription = JSON.parse(array[i]);
    console.log(array[i]);
      webPush.sendNotification(subscription, payload, options)
      .then(function() {
        res.sendStatus(201);
      })
      .catch(function(error) {
        console.log(error);
        res.sendStatus(500);
      });

  }
  res.sendStatus(200)
})

app.use(cors({origin: 'https://rde-517-msharma.us-east-1.int.timeinc.net'}));
app.post('/savesubcription', (req, res) => {
  console.log(req.data)
  //message.push(req.body)
  var data = "New File Contents";
  fs.appendFile('sub.txt', JSON.stringify(req.body) + '\r\n', function(err, data) {
    if (err) console.log(err);
    console.log(req.data)
    console.log("Successfully Written to File.");
});
  res.sendStatus(200)
})

app.use(cors({origin: 'https://rde-517-msharma.us-east-1.int.timeinc.net'}));
app.get('/getpublickey', (req, res) => {

  //const vapidPublicKey = webpush.generateVAPIDKeys();;
  //const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
  fs.readFile('key.json', function(err, buf) {
    console.log(buf.toString());
    res.send(buf.toString())
  });
})

/*app.listen(5000, () => {
  console.log("server running");
})*/

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);

