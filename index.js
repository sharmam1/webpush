var express = require('express')
var fs = require('fs');
var app = express()
var bodyParser = require('body-parser')
const webpush = require('web-push');

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
var message = [
  {name: 'manish', message: 'hey hello'},
  {name: 'sharma', message: 'hey hello world'},
  {name: 'kumar', message: 'hey hello world1'},
]

app.post('/messages', (req, res) => {
  console.log(req.body);
  message.push(req.body)
  res.sendStatus(200)
})

app.post('/send/notifiction', (req, res) => {
 
  res.sendStatus(200)
})

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

app.get('/getpublickey', (req, res) => {

//const vapidPublicKey = webpush.generateVAPIDKeys();;
//const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

  fs.readFile('key.json', function(err, buf) {
    console.log(buf.toString());
    res.send(buf.toString())
  });
  console.log('manish')
})

app.get('/messages', (req, res) => {

// Prints 2 URL Safe Base64 Encoded Strings
//console.log(vapidKeys.publicKey, vapidKeys.privateKey);
res.send('welcome back')
console.log('manish')
})

app.listen(5000, () => {
  console.log("here");
})

