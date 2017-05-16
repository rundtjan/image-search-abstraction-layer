var express = require('express')
var path = require("path");
var app = express();

app.get('/timestamp', function (req, res) {
  res.sendFile('/home/ubuntu/workspace/timestamp/hello.html')
})

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'templates'));

app.get('/timestamp/:date', function (req, res) {
  //

  //res.send(req.params.date)
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})