var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

var router = express.Router();

require("./config/routes")(router);

var app = express();

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(router);

var db = process.env.MONGODB_URI || "mongodb://heroku_cd364n0f:f9coi030d0t7uehbo57tcaroda@ds111549.mlab.com:11549/heroku_cd364n0f";

mongoose.connect(db, function(error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("mongoose connection is successful");
  }
});

app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});