const fs = require('fs');

fs.writeFileSync('HelloWorld.txt', 'Hello World!', (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Successfully wrote file!');
  }
});