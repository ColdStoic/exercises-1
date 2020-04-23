const AWS = require('aws-sdk');
var Promise = require('promise');
var {google} = require('googleapis');
var youtube = google.youtube({
   version: 'v3',
   auth: "AIzaSyBzT6CL3GmgBoHvvSDK8dGgjQT1gFP_rP4"
});

exports.handler = (event, context, callback) => {
    const requestBody = JSON.parse(JSON.stringify(event));
    const search = requestBody.item.search;
    searchByKeyword(search).then((data) => {
        console.log(data.items);
        callback(null, {
            statusCode: 201,
            body: JSON.stringify({
                videos: data.items
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    });
};

function searchByKeyword(search) {
    return new Promise(function(resolve, reject) {
        youtube.search.list(
        {
            part: 'snippet',
            q: search,
            type: "video",
            maxResults: 25
        }, function (err, data) {
            if (err) {
                reject(err);
            }
            if (data) {
                resolve(data.data);
            }
        })
    })
}