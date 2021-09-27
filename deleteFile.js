/*   - Require the fs module
  - Implement the fs.unlink()
  - Run node deleteFile.js */

const fs = require('fs');

fs.unlink('HelloWorld.txt', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('File deleted!');
  }
});