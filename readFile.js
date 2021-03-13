const fs = require("fs");

fs.readFile("HelloWorld.txt", (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data.toString());
  }
});
