// 3b Filesystem, Buffer & Streams 

// i - Filesystem
var fs = require('fs'); // loading filesystem module

fs.writeFile('./test.txt', 'hello', function(err) { // creates a file
  if (err) {
    throw err;
  }
  console.log("Created file");
});

fs.appendFile('./test.txt', ' world', function(err) { // appends text to a file
  if (err) {
    throw err;
  }
  console.log("Created file");
});


fs.readFile('./test.txt', 'utf8', function(err, data) { // reading file
  if (err) {
    throw err;
  }
  console.log(data);
});

fs.rename('test.txt', 'test1.txt', function(err) { // renaming a file
  if (err) {
    throw err;
  }
  console.log('The file has been renamed');
});

fs.unlink('./test.txt', function(err) { // deleting a file. This one should fail due to incorrect file name
  if (err) {
    throw err;
  }
  console.log('The file has been deleted');
});

fs.unlink('./test1.txt', function(err) {
  if (err) {
    throw err;
  }
  console.log('The file has been deleted');
});

// ii - Path
const path = require('path'); // loading path module

console.log(path.basename(__filename)); // returns base slug of the path provided
console.log(path.dirname(__filename)); // returns the directory path of the file
console.log(path.extname(__filename)); // returns the file extension type
console.log(path.parse(__filename)); // returns an object containing info on the file