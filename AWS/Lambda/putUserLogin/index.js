const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const randomBytes = require('crypto').randomBytes;

exports.handler = (event, context, callback) => {
    const requestBody = JSON.parse(JSON.stringify(event));
    var firstname = requestBody.firstname;
    var lastname = requestBody.lastname;
    var email = requestBody.email.toLowerCase();
    var password = requestBody.password;
    
    const userId = toUrlString(randomBytes(4));
    
    putUser(userId, firstname, lastname, email, password).then(() => {
        callback(null, {
            statusCode: 201,
            body: JSON.stringify({
                user_id: userId,
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        callback(err, null);
    });
};

function putUser(userId, firstname, lastname, email, password) {
    return ddb.put({
        TableName: 'bmousers',
        Item: {
            user_id: userId,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        },
    }).promise();
}

function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}