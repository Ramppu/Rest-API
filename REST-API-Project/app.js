var express = require("express");
var app = express();
var mongoose = require('mongoose');
var model = require('./models/song');
var Song  = mongoose.model('Song');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/api/songs", function(req, res) { // Returns All the songs in the database
  Song.find({}, function(err, results) {
    if(err) {
      res.json("Error!");
    }
    else {
      res.status(200).json(results);
    }
  });
});


app.get("/api/songs/:id", function(req, res) { //One song with a specific ID
  var id = req.params.id;
  Song.findById(id, function(err, results) {
    if(err) {
      res.json("Error!");
    }
    else {
      res.status(200).json(results);
    }
  });
});


app.get("/api/lisaa/:name/:album/:band", function(req, res) { //Adds one song to the database
  var name = req.params.name;
  var album = req.params.album;
  var band = req.params.band;

  var song = new Song ({
    name: name,
    album: album,
    band: band,
  });

  song.save(function(err, candidate) {
if (err) return console.log(err);
    console.log(candidate);
});
  res.send("Adding Song: " + band + " (" + name + ") " + album);
});


app.get("/api/muokkaa/:id", function(req, res) { //Alters one song in the database
  var id = req.params.id;
  Song.findById(id, function (err, doc) {
    doc.name = 'Tecccct';
    doc.save();
  });
  res.send("Muokataan leffaa id:llä: " + req.params.id);
});


app.get("/api/poista/:id", function (req, res) { //Deletes a song by a specific id
  var id = req.params.id;

  Song.findByIdAndDelete(id, function (err, results) {
      res.json("Deleted " + id + " " + results.name, 200);
  });
});

app.get('*',function (req, res) {
        res.redirect('/api/songs');
    });


app.listen(8081, function() {
  console.log("Kuunnellaan porttia 8081!");
});
