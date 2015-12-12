var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var path = require("path");
var morgan = require("morgan");
var exphbs = require("express-handlebars");
var app = express();




app.set("port", process.env.PORT || 9898);
app.set("envitem", process.env.ENVITEM || "NOTHING SET");
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(favicon(path.join(__dirname, "public/images/npm.ico")));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public/views"));
app.engine(".hbs", exphbs({extname: ".hbs"}));
app.set("view engine", ".hbs");

app.get("/", function(req, res){
  res.render("index", {configItem: app.get("envitem")});
});


http.createServer(app).listen(app.get("port"), function(){
  console.log("Listening on port: %s", app.get("port"));
});
