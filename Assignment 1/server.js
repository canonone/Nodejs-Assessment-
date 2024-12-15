const http = require("http");
const fs = require("fs");
const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/index.html") {
    fs.readFile("./index.html", (error, data) => {
      if (error) {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("404 page not found");
      }
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>404 page not found</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`server is running at port "http://localhost:${PORT}"`);
});
