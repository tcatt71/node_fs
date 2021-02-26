const { appendFile, readFile } = require("fs");
const { EventEmitter } = require("events");
const path = require("path");
const http = require("http");

const NewsLetter = new EventEmitter();

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
      .on("data", (chunk) => chunks.push(chunk))
      .on("end", () => {
        response.on("error", (err) => {
          console.log(err);
          response.writeHead(500, { "Content-Type": "text/html" });
          response.end("An error occurred on the server :(");
        });

        if (method === "POST" && url === "/newsletter_signup") {
          const body = JSON.parse(Buffer.concat(chunks).toString());

          const newContact = `${body.name},${body.email}\n`;

          NewsLetter.emit("signup", newContact);

          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(
            JSON.stringify({ msg: "Successfully added contact!" })
          );
          response.end();
        } else if (url === "/newsletter_signup" && method === "GET") {
          readFile("index.html", (err, data) => {
            if (err) {
              console.log(err);
              response.writeHead(500, { "Content-Type": "text/html" });
              return response.end("An error occurred on the server :(");
            }
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(data);
            return response.end();
          });
        } else {
          response.statusCode = 404;
          response.write("<h1>404 NOT FOUND :(((</h1>");
        }
      });
  })
  .listen(3000, () => console.log("Server listening on port 3000..."));

NewsLetter.on("signup", (newContact) => {
  appendFile(path.join(__dirname, "newsletter.csv"), newContact, (err) => {
    if (err) throw err;
    console.log("The file has been updated!");
  });
});
