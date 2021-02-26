const { appendFile } = require("fs");
const path = require("path");
const http = require("http");

http
  .createServer((request, response) => {
    const { method, url } = request;

    const chunks = [];

    request
      .on("error", (err) => {
        console.error(err);
        request.writeHead(400, { "Content-Type": "text/html" });
        request.end("An error occurred on the server :(");
      })
      .on("data", (chunk) => {
        chunks.push(chunk);
      })
      .on("end", () => {
        const body = Buffer.concat(chunks).toString();

        response.on("error", (err) => {
          console.log(err);
          response.writeHead(500, { "Content-Type": "text/html" });
          response.end("An error occurred on the server :(");
        });

        appendFile(path.join(__dirname, "/src/contacts.txt"), body, (err) => {
          if (err) throw err;
          console.log("The file has been saved!");
        });

        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify({ msg: "Successfully added contact!" }));
        response.end();
      });
  })
  .listen(3000, () => console.log("Server listening on port 3000..."));
