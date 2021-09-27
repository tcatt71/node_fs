/* - Inside of readFile.js:
  - Require the fs module
  - Implement the fs.readFile()
  - You can either read the contents of the HelloWorld.txt file, or any other file you create in your project
  - Run node readFile.js to read the file to the console */

const fs = require('fs');

fs.readFile('HelloWorld.txt', function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data.toString());
  }
});