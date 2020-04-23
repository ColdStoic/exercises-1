const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const randomBytes = require('crypto').randomBytes;

exports.handler = (event, context, callback) => {
    const requestBody = JSON.parse(JSON.stringify(event));
    
    var itemName = requestBody.item.itemName;
    var supplierName = requestBody.item.supplierName;
    var quantity = parseInt(requestBody.item.quantity);
    
    const itemId = toUrlString(randomBytes(4));
    
    putInventory(itemId, itemName, supplierName, quantity).then(() => {
        // You can use the callback function to provide a return value from your Node.js
        // Lambda functions. The first parameter is used for failed invocations. The
        // second parameter specifies the result data of the invocation.

        // Because this Lambda function is called by an API Gateway proxy integration
        // the result object must use the following structure.
        callback(null, {
            statusCode: 201,
            body: JSON.stringify({
                item_id: itemId,
                item_name: itemName,
                supplier_name: supplierName,
                quantity: quantity
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error(err);
    });
};

function putInventory(itemId, itemName, supplierName, quantity) {
    return ddb.put({
        TableName: 'inventory',
        Item: {
            item_id: itemId,
            item_name: itemName,
            supplier_name: supplierName,
            quantity: quantity
        },
    }).promise();
}

function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
