const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const querystring = require('querystring');

exports.handler = (event, context, callback) => {
    const requestBody = JSON.parse(JSON.stringify(event));
    var itemId = requestBody.item.itemId;
    
    deleteInventory(itemId).then(() => {
        // You can use the callback function to provide a return value from your Node.js
        // Lambda functions. The first parameter is used for failed invocations. The
        // second parameter specifies the result data of the invocation.

        // Because this Lambda function is called by an API Gateway proxy integration
        // the result object must use the following structure.
        callback(null, {
            statusCode: 201,
            body: JSON.stringify({
                item_id: itemId
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error(err);
        errorResponse(err.message, context.awsRequestId, callback)
    });
};

function deleteInventory(itemId) {
    var params = {
        TableName: "inventory",
        Key: {
            "item_id": itemId
        }
    };
    var promise = ddb.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        }
    }).promise();
    
    return promise;
}

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}
