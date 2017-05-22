var express = require('express')
var path = require("path");
var app = express();
var request = require('request')
var myHttp = require('./myHttp.js');
var mongo = require('mongodb').MongoClient;


app.get('/imagesearch', function(req, res) {
  res.send(myHttp("info"))
})

app.get('/imagesearch/:searchterm', function (req, res) {
  var offset = 1;
  if (req.query.offset !== undefined) {offset = req.query.offset}
  console.log(req.params.searchterm)
  var url = 'https://www.googleapis.com/customsearch/v1?searchtype=image&key=AIzaSyDoWMgf_idhENTMBQt-cT0T0PapDXUzzKo&cx=007950092833218364137:09ypimf69qy&searchType=image&start=' + offset + '&q=' + req.params.searchterm
  request(url, function (error, response, body) {
    if (error) {res.send("Sorry, couldn't process your request.")};
  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  //console.log('body:', body); // Print the HTML for the Google homepage. 
var bodyObj = JSON.parse(body);
res.send(myHttp("result", bodyObj.items));

mongo.connect('mongodb://localhost:27017/imagesearch', function(err, db) {
      if (err) throw err;
      if (db) {
      var date = new Date();
      console.log(date)
      var toAdd = {"term": req.params.searchterm, "when": date};
      db.collection("searches").insert(toAdd);
     
      }
    }); 

});
  
})

app.get('/latest/imagesearch', function (req, res) {
  mongo.connect('mongodb://localhost:27017/imagesearch', function(err, db) {
      if (err) throw err;
      if (db) {
        db.collection("searches").find().toArray(function(err, documents){
          if (err) throw err;
          res.send(myHttp("history", documents))
        })
      }
  });
});


//api-key AIzaSyDoWMgf_idhENTMBQt-cT0T0PapDXUzzKo


app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
})