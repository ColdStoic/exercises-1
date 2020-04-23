// 7 - XML, JSON

// Loading modules
const fs = require('fs');
var json2xml = require('json2xml');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

let xml_string = fs.readFileSync("cd_catalog.xml", "utf8"); // Reading XML file

// a - XML to JSON 
// Async function to convert XML to JSON
function convertXml2Json(xml) {
  return new Promise(function(resolve, reject) { // create a promise
    parser.parseString(xml, function(error, result) {
      if(error === null) {
        resolve(result); // return Json
      }
      else {
        reject(err);
      }
    })
  })
}

// Calling function / handling promise
convertXml2Json(xml_string)
  .then(data => {
    console.log(data);
    convertJson2Xml(data); // calling Json2Xml function
  })
  .catch(err => console.log(err));


// b- JSON to XML 
function convertJson2Xml(json) {
  var result = json2xml(json);
  console.log(result);
}