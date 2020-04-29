// Otetaan moduuli käyttöön
var mongoose = require("mongoose");
var uri =
  "mongodb+srv://adminUser:Q5NVwtfBikajBJDG@cluster0-tuovx.mongodb.net/songs";

// Yhdistetään tietokantaan
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Määritellään Schema, eli tietomalli.
const Song = mongoose.model(
  "Song",
  {
    name: String,
    album: String,
    band: String,
  },
  "song"  // HUOM. Kohdistetaan skeeman operaatiot tähän kokoelmaan
);
