// 4 Async / Await / Promise

// a - Read a file, split them and create them as multiple part files which carry 10 lines and go by their index order
var fs = require('fs'); // loading filesystem module

function splitFile(data, value) { // splits file into equal parts of a specified divisor
  let length = data.length / value;
  for (let i = 1; i <= value; i++) {
    fs.writeFile(('./text' + i + '.txt'), data.slice((i-1), (i*length)), function(err) { // creates a file
      if (err) throw err;
    });
  }
}

// Promise Version
function getFileData(filename, type) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, type, function(err, data) { // reading file
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  }) 
}

getFileData('./text.txt', 'utf8')
  .then(data => splitFile(data, 10))
  .catch(err => console.log(err));

// Async / Await Version
async function getFileData2(filename, type) {
  const data = await fs.readFileSync(filename, type);
  splitFile(data, 10);
}

getFileData2('./text.txt', 'utf8');


// b - Extract the contents of a Website URL and print them
var fetch = require('node-fetch');

async function getWebsiteContent() {
  var res = await fetch('https://google.com');
  var data = await res.text();
  console.log(data);
}

getWebsiteContent();