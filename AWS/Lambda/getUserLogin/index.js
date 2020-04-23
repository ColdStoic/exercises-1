const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const _ = require('lodash');

exports.handler = (event, context, callback) => {
    const requestBody = JSON.parse(JSON.stringify(event));
    var email = requestBody.email.toLowerCase();
    var password = requestBody.password;
    var params = {};
    
    if(password) {
        params = {
            TableName: "bmousers",
            Key: {
                "email": email,
                "password": password
            }
        };
    } else {
        params = {
            TableName: "bmousers",
            Key: {
                "email": email
            }
        };
    }
    
    ddb.scan(params, function(err, data) {
        if (err) {
            callback(err, null);
        } else {
            var user = {};
            if (password) {
                user = _.find(data.Items, { email: email, password: password });
            } else {
                user = user = _.find(data.Items, { email: email });
            }
            
            if(user) {
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    });
};