const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

var json2xml = require('json2xml');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

var raw_xml = event.xml;
var json = {};
var email = '';
parser.parseString(raw_xml, function (err, result) {
    json = result;
    email = json['soap:Envelope']['soap:Body'][0].getUserInfo[0].userEmail[0];
});

var raw_xml = 
    '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \
        <soap:Body> \
            <getUserInfo xmlns="https://www.w3schools.com/userinfo"> \
                <userEmail>' + email + '</userEmail> \
            </getUserInfo> \
        </soap:Body> \
    </soap:Envelope>';

var json = {};
parser.parseString(raw_xml, function (err, result) {
    console.dir(result);
    json = result;
});

email = 'peter.d.ngu@gmail.com';

var xml = json2xml(json, { attributes_key: 'ATTR' });
console.log(xml);

console.log(json['soap:Envelope']['soap:Body'][0].getUserInfo[0].userEmail[0]);