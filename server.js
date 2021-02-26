const http = require("http");

http
  .createServer((req, res) => {
    // Destructure the url property from the request object
    const { url } = req;
    console.log(req);
    res.setHeader("Content-Type", "text/html");
    if (url === "/") {
      res.statusCode = 200;
      res.write("<h1>Home</h1>");
    } else if (url === "/about") {
      res.statusCode = 200;
      res.write("<h1>About</h1>");
    // } else if (url === "/echo") {
    //   res.write(JSON.stringify(req));
    } else {
      res.statusCode = 404;
      res.write("<h1>404 NOT FOUND :(((</h1>");
    }
    res.end();
  })
  .listen(3000, () => console.log("Server listening on port 3000..."));
