# Node.js Assignment: Servers and APIs

This project involves building two types of servers without using a framework:

1. A **web server** that serves HTML files.
2. An **API server** that manages inventory information using the file system for data persistence.

## Project Overview

### Web Server

- The server serves a simple HTML page when navigating to `/index.html`.
- If any other URL is accessed with a random `.html` filename (e.g., `/random.html`), the server returns a 404 error page.

### API Server

- The API manages an inventory with the following operations:
  - **Create an item**
  - **Get all items**
  - **Get one item**
  - **Update an item**
  - **Delete an item**

#### Item Attributes

- **Name**: The name of the item.
- **Price**: The price of the item.
- **Size**: The size of the item (small (s), medium (m), or large (l)).
- **Id**: Unique identifier for each item.

API Endpoints
Web Server
GET /index.html: Returns a simple webpage for the student.
GET /{random}.html: Returns a 404 error page for any other .html files.
API Server
GET /items: Get all items in the inventory.
GET /item?name={name}&size={size}: Get a specific item by its name and size.
POST /items: Create a new item (requires a JSON body with name, price, and size).
PUT /item?name={name}&size={size}: Update an existing item by its name and size (allows updating price and size).
DELETE /item?name={name}&size={size}: Delete an item by its name and size.
