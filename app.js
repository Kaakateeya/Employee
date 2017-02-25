var express = require('express');
var app = express();
var path = require('path');
var AWS = require('aws-sdk');
var bodyParser = require('body-parser');

var crypto = require('crypto');
var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();

app.use(express.static('public'));
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    //res.sendfile('indexdefault.html', { root: __dirname + "/" }) ;
    res.sendfile('index.html', { root: __dirname + "/" });
});
app.listen(7000, function() {
    console.log('Example app listening on port 7000!');
});
app.use('*', function(req, res, next) {
    res.sendFile('index.html', { root: __dirname + "/" });
});