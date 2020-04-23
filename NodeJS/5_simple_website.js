// 5 Creating a Simple Website Using Express
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    //res.send('Hello World');
    res.sendFile(__dirname + "/simpleWebsite.html");
});

app.get('/ledzeppelin', (req, res) => {
    res.sendFile(__dirname + "/ledzeppelin.html");
});

app.get('/metallica', (req, res) => {
    res.sendFile(__dirname + "/metallica.html");
});

app.get('/kino', (req, res) => {
    res.sendFile(__dirname + "/kino.html");
});

app.listen(3000, () => 
    console.log('Listening on port 3000...')
);