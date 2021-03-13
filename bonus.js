const http = require("http");
const fs = require("fs");
const path = require("path");

http
  .createServer((request, response) => {
    const { url, method } = request;

    response.on("error", (error) => {
      response.statusCode = 500;
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(error));
      response.end();
    });

    switch (url) {
      case "/":
        serveHTML("home", response, 200, url, method);
        break;
      case "/about":
        serveHTML("about", response, 200, url, method);
        break;
      default:
        serveHTML("notFound", response, 404, url, method);
    }
  })
  .listen(3000, () => console.log("Server listening..."));

function customLogger(log, response) {
  fs.appendFile("requests.txt", log, (error) => {
    if (error) {
      console.log(error);
      response.emit("error", error);
      return;
    }
    console.log(log);
  });
}

function serveHTML(filename, response, statusCode, url, method) {
  fs.readFile(
    path.join(__dirname, `../pages/${filename}.html`),
    (error, data) => {
      if (error) {
        console.log(error);
        response.emit("error", error);
        return;
      }

      if (statusCode === 404) {
        response.statusCode = statusCode;
      }

      const log = `${method} -- ${url} -- ${statusCode} -- ${new Date().toString()}\n`;
      customLogger(log, response);

      response.setHeader("Content-Type", "text/html");
      response.write(data);
      response.end();
    }
  );
}
