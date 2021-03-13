const fs = require("fs");

fs.unlink("HelloWorld.txt", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Successfully deleted file!");
  }
});
