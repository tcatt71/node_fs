const fs = require("fs");
const http = require("http");

const port = 3000;
// Creates a server object
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" }); // http header
    console.log(req.params);
    res.write(req.method); // write a response to the client
    return res.end(); // end the response
  })
  .listen(port, () => console.log("Server listening on port: " + port));
