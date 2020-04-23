const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    var params = {
        TableName: "inventory",
    };
    ddb.scan(params, function(err, data) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
    })
};
