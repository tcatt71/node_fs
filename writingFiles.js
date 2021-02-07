const fs = require("fs");

let foundFolder = fs.existsSync("source");

if (foundFolder) {
  console.log("Folder already exists!");
} else {
  fs.mkdir("source", (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Folder created!");
  });
}

