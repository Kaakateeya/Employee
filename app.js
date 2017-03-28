var express = require('express');
var app = express();
var path = require('path');
var AWS = require('aws-sdk');
var bodyParser = require('body-parser');
var getmac = require('getmac');
var clientIp = require('client-ip');
var requestIp = require('request-ip');
var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();



app.use(express.static('public'));
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);



app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function(req, res) {
    //res.sendfile('indexdefault.html', { root: __dirname + "/" }) ;
    res.sendfile('index.html', { root: __dirname + "/" });
});
app.listen(7000, function() {
    console.log('Example app listening on port 7000....!');
});
app.get('/getmac', function(req, res) {
    console.log("getmac");
    require('getmac').getMac(function(err, macAddress) {
        if (err) throw err;
        console.log(macAddress);
        res.send(macAddress);
    });

    // Validate that an address is a mac address 
    if (require('getmac').isMac("e4:ce:8f:5b:a7:fc")) {
        console.log('valid mac');
    } else {
        console.log('invalid mac');
    }

});


app.get('/getClientIp', function(req, res) {
    console.log("getClientIp");
    var ip = requestIp.getClientIp(req); // on localhost > 127.0.0.1
    res.send(ip);
});

app.post('/photoUplad', multipartyMiddleware, function(req, res) {
    console.log(app.BucketName);
    console.log(req.body);
    console.log('-------------------');
    console.log(req.files.file);
    var fs = require('fs');
    var savePath = req.body.keyname;
    var splitSlash = (req.body.keyname).split('/');
    var custDynamicPath = splitSlash[2];


    if (!fs.existsSync(__dirname + "/Images")) {
        fs.mkdirSync(__dirname + "/Images");
    }
    if (!fs.existsSync(__dirname + "/Images/ProfilePics")) {
        fs.mkdirSync(__dirname + "/Images/ProfilePics");
    }
    if (!fs.existsSync(__dirname + "/Images/ProfilePics/" + custDynamicPath)) {
        fs.mkdirSync(__dirname + "/Images/ProfilePics/" + custDynamicPath);
    }
    fs.readFile(req.files.file.path, function(err, data) {
        console.log('testtt');
        fs.writeFile(savePath, data, function(err) {});
    });



    AWS.config.update({ "accessKeyId": "AKIAJFHGL3HSVRB655MQ", "secretAccessKey": "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", "region": "ap-south-1" });
    // Create S3 service object
    s3 = new AWS.S3({ apiVersion: '2006-03-01' });

    // call S3 to retrieve upload file to specified bucket
    var uploadParams = { Bucket: 'kaakateeyaprod', Key: req.body.keyname, Body: '' };
    var file = req.files.file;


    var fileStream = fs.createReadStream(file.path);
    fileStream.on('error', function(err) {
        console.log('File Error', err);
    });
    uploadParams.Body = fileStream;

    var path = require('path');

    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        }
        if (data) {
            console.log("Upload Success", data.Location);
        }
    });



    res.end();

});

app.post('/photoDelete', multipartyMiddleware, function(req, res) {
    console.log(req.body.keyname);
    console.log('-------------------');


    var fs = require('fs');
    if (fs.existsSync(__dirname + "/" + req.body.keyname)) {
        fs.unlink(req.body.keyname);
    }

    var AWS = require('aws-sdk');

    AWS.config.update({ "accessKeyId": "AKIAJFHGL3HSVRB655MQ", "secretAccessKey": "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", "region": "ap-south-1" });

    var s3 = new AWS.S3();
    var params = {
        Bucket: 'kaakateeyaprod',
        Key: req.body.keyname
    };

    s3.deleteObject(params, function(err, data) {
        if (err) console.log(err)
        else console.log("Successfully deleted myBucket/myKey");
    });
    res.end();
});

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



// added

//end add
app.use('*', function(req, res, next) {
    res.sendFile('index.html', { root: __dirname + "/" });
});