const http = require("http");
const fs = require("fs");

const port = 3000;

// Creates a server object
http
  .createServer(function (req, res) {
    // Uses the readFile method from the fs module
    fs.readFile("HelloWorld.txt", function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" }); // http header
      res.write(data); // write a response to the client
      return res.end(); // end the response
    });
  })
  .listen(port, () => console.log("Server listening on port: " + port));
