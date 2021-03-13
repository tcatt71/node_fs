const fs = require("fs");

fs.appendFile("HelloWorld.txt", "Here's some more text!", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Successfully updated file!");
  }
});
