const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const _ = require('lodash');

var json2xml = require('json2xml');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR" });


exports.handler = (event, context, callback) => {
    var raw_xml = event.xml;
    var json = {};
    var email = '';
    parser.parseString(raw_xml, function (err, result) {
        if (err) {console.log(err)}

        json = result;
        email = json['soap:Envelope']['soap:Body'][0].getUserInfo[0].userEmail[0];
    });
    
    var params = {
        TableName: "bmousers",
        Key: {
            "email": email
        }
    };
    
    ddb.scan(params, function(err, data) {
        if (err) {
            callback(err, null);
        } else {
            var user = user = _.find(data.Items, { email: email });
            callback(null, user);
        }
    });
};