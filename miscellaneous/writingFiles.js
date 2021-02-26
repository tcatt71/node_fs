const { mkdir, existsSync, readdir } = require("fs");

let foundFolder = existsSync("src");

if (foundFolder) {
  console.log("Folder already exists!");
  readdir("src", (error, files) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(files.join("\n"));
  });
} else {
  mkdir("src", (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Folder created!");
  });
}

// Absolute
// Location in the C:/Users/truecoders/repos/node/node_fs/index.html

// Relative
// Current working directory - location - index.html, about.html, assets/, styles/
