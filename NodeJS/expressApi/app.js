'use strict';

const express = require('express');
const app = express();
const AWS = require('aws-sdk');

const Busboy = require('busboy');
const bodyParser = require('body-parser');
const cors = require('cors');
var multer = require('multer');
var upload = multer();

app.use(cors());
app.use(bodyParser.json());
//app.use(upload.array());
app.use(upload.single('file'));
app.use(express.static('public'));

const BUCKET_NAME = 'bmo-training-peterdn';
const IAM_USER_KEY = 'AKIA2WUHVGGGOPNZDC5H';
const IAM_USER_SECRET = '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';

function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME + '/uploads'
  });
  
  s3bucket.createBucket(function () {
      var params = {
        Bucket: BUCKET_NAME + '/uploads',
        Key: file.originalname,
        Body: file.buffer
      };
      s3bucket.upload(params, function (err, data) {
        if (err) {
          console.log('error in callback');
          console.log(err);
        }
        console.log('success');
        console.log(data);
      });
  });
}

// Test endpoint
app.get('/', cors(), (req, res) => res.send('Hello world!'));

// Get list of files in S3 bucket Uploads folder
app.get('/upload', cors(), (req, res) => {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  
  var params = { 
    Bucket: BUCKET_NAME,
    Delimiter: '/',
    Prefix: 'uploads/'
  }

  s3bucket.listObjects(params, function (err, data) {
    if(err)throw err;
    console.log(data);
    res.send(data);
  });
});

// Post/upload file to S3 bucket folder
app.post('/upload', cors(), (req, res) => {
    var busboy = new Busboy({ headers: req.headers });
    
    // The file upload has completed
    busboy.on('finish', function() {
      const file = req.file;
      uploadToS3(file);
    });
    
    req.pipe(busboy);
    res.send('Upload complete');
});

module.exports = app;