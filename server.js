var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = 3000;

app.use(session({
	secret: 'keyboardCat',
	resave: true,
	saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "aceofspades!1",
  database: "input_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res) {
    res.render("login");
});
//-----------------Adds new Band Account
app.post("/bandReg", function(req, res) {
    var username = req.body.user;
    var password = req.body.pass;
    var email = req.body.email;
    if(username && password && email) {
        connection.query("INSERT INTO bands (username, password, email) VALUES (?, ?, ?)"
        ,[username, password, email], function(err, data) {
            return res.status(200).end();
        });
    } else {
        return res.status(404).end();
    }
});
// ------------------Adds new Manager Account
app.post("/managerReg", function(req, res) {
    var username = req.body.user;
    var password = req.body.pass;
    var email = req.body.email;
    if(username && password && email) {
        connection.query("INSERT INTO managers (username, password, email) VALUES (?, ?, ?)"
        ,[username, password, email], function(err, data) {
            return res.status(200).end();
        });
    } else {
        return res.status(404).end();
    }
});
// ------------------Validates input
app.post("/authBand", function(req, res) {
    var username = req.body.user;
    var password = req.body.pass;
    if(username && password) {
        connection.query("SELECT * FROM bands WHERE username = ? AND password = ?", 
        [username, password], function(err, data) {
            if(data.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                console.log("Redirecting to " + username + "'s page...");
                return res.send({ status: true, id: data[0].id });
            } else {
                return res.send({ status: false });
            }
        });
    } else {
        return res.send("Please enter Username and Password");
    }
});

app.get("/band/:id", function(req, res) {
    if(req.session.loggedin) {
        console.log(req.params.id);
        var id = req.params.id;
        return res.render("band", {id: id});
    } else {
        return res.send("Please sign in");
    }
});

app.listen(PORT, function() {
    console.log("Server listening on: localhost:" + PORT);
  });