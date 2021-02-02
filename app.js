const http = require("http");
const fs = require("fs");

const port = 3000;

http
  .createServer(function (req, res) {
    fs.readFile("index.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(port, () => console.log("Server listening on port: " + port));
