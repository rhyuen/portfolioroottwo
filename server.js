var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var path = require("path");
var morgan = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var helmet = require("helmet");
var config = require("./config.js");
var app = express();

app.set("port", process.env.PORT || 9898);
app.set("envitem", process.env.ENVITEM || "NOTHING SET");
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(favicon(path.join(__dirname, "public/images/npm.ico")));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public/views"));
app.engine(".hbs", exphbs({extname: ".hbs"}));
app.set("view engine", ".hbs");

/*
mongoose.connect(config.db, function(err){
  if(err)
    console.error(err);
  console.log("DB CONN attempted.");
});*/

app.get("/", function(req, res){
  res.render("index", {configItem: app.get("envitem")});
});

app.get("/alt", function(req, res){
  res.render("altindex");
});

app.get("/ajaxindex", function(req, res){
  res.render("ajaxindex");
});

app.get("/quotes", function(req, res){
  res.render("quotes");
});

app.post("/ajaxindex", function(req, res){
  console.log(req.body.formName);
  console.log(req.body.formEmail);
});



app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(err.status||500);
  res.send(err.message);
});

http.createServer(app).listen(app.get("port"), function(){
  console.log("Listening on port: %s", app.get("port"));
  console.log("Current Environment: %s", app.get("env"));
});
