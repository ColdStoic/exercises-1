var AWS = require('aws-sdk');
var ses = new AWS.SES({region: 'us-east-1'});

var response = {
    "isBase64Encoded": false,
    "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'example.com'},
    "statusCode": 200,
    "body": "{\"result\": \"Success.\"}"
};

exports.handler = function (event, context) {
    var email = '';
    var firstname = '';
    var lastname = '';

    for (const record of event.Records) {
        email = record.dynamodb.NewImage.email.S;
        firstname = record.dynamodb.NewImage.firstname.S;
        lastname = record.dynamodb.NewImage.lastname.S;
    }
    
    sendEmail(firstname, lastname, email, function (err, data) {
        context.done(err, null);
    });
};

function sendEmail (firstname, lastname, email, done) {
    var params = {
        Destination: {
            ToAddresses: [
                email
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'name: ' + firstname + '\nemail: ' + email,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Welcome to my test site ' + firstname + ' ' + lastname,
                Charset: 'UTF-8'
            }
        },
        Source: 'peter.d.ngu@gmail.com'
    };
    ses.sendEmail(params, done);
}