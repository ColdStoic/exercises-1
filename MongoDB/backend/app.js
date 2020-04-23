var express = require('express');
var app = express();

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post("/radioButtons", function (req, res) {
  data = req.body;
  var uri = 'mongodb+srv://admin:dummyPassAdmin123!@bmo-1-l1ey2.mongodb.net/BMO-1?retryWrites=true&w=majority';
  MongoClient.connect(uri)
    .then(client => {
      console.log('Connected');
      client.db().collection('radioButtons').insertOne(data);
      console.log('Inserted: ', data);
      client.close();
    })
    .catch(err => {
      console.log(err);
    });

  res.status(201).json({ message: 'Answer added to DB', data });
});

var uri = 'mongodb+srv://admin:dummyPassAdmin123!@bmo-1-l1ey2.mongodb.net/test?retryWrites=true&w=majority';
MongoClient.connect(uri)
  .then(client => {
    console.log('Connected');
    client.close();
  })
  .catch(err => {
    console.log(err);
  });

app.listen(3100);
