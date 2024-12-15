const http = require("http");
const url = require("url");
const controller = require("./controller");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  const { pathname, query } = url.parse(req.url, true);

  if (pathname === "/items" && req.method === "GET") {
    controller.getAllItems(res);
  } else if (pathname.startsWith("/item") && req.method === "GET") {
    controller.getItem(query, res);
  } else if (pathname === "/items" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      controller.createItem(body, res);
    });
  } else if (pathname.startsWith("/item") && req.method === "PUT") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      controller.updateItem(query, body, res);
    });
  } else if (pathname.startsWith("/item") && req.method === "DELETE") {
    controller.deleteItem(query, res);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
