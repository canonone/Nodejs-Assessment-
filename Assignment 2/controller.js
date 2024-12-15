const fs = require("fs");

// Helper function to read items from the file
const readItemsFromFile = () => {
  const data = fs.readFileSync("items.json", "utf8");
  return JSON.parse(data);
};

// Helper function to write items to the file
const writeItemsToFile = (items) => {
  fs.writeFileSync("items.json", JSON.stringify(items, null, 2));
};

// Function to handle GET /items (Get all items)
const getAllItems = (res) => {
  const items = readItemsFromFile();
  res.statusCode = 200;
  res.end(JSON.stringify(items));
};

// Function to handle GET /item?id=... (Get a specific item by id)
const getItem = (query, res) => {
  const { id } = query;
  const items = readItemsFromFile();
  const item = items.find((i) => i.id == id);

  if (item) {
    res.statusCode = 200;
    res.end(JSON.stringify(item));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Item not found" }));
  }
};

// Function to handle POST /items (Create a new item)
const createItem = (body, res) => {
  const newItem = JSON.parse(body);
  const { name, price, size } = newItem;

  if (!name || !price || !size) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Name, price, and size are required" }));
    return;
  }

  const items = readItemsFromFile();
  const existingItem = items.find(
    (item) => item.name === name && item.size === size
  );
  if (existingItem) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Item already exists" }));
    return;
  }

  // Assign a new unique id (last id + 1)
  const id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
  newItem.id = id;

  items.push(newItem);
  writeItemsToFile(items);
  res.statusCode = 201;
  res.end(JSON.stringify(newItem));
};

// Function to handle PUT /item?id=... (Update an item)
const updateItem = (query, body, res) => {
  const { id } = query;
  const updatedData = JSON.parse(body);
  const { price, newSize } = updatedData;

  const items = readItemsFromFile();
  const item = items.find((i) => i.id == id);

  if (item) {
    if (price) item.price = price;
    if (newSize) item.size = newSize;
    writeItemsToFile(items);
    res.statusCode = 200;
    res.end(JSON.stringify(item));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Item not found" }));
  }
};

// Function to handle DELETE /item?id=... (Delete an item)
const deleteItem = (query, res) => {
  const { id } = query;
  const items = readItemsFromFile();
  const filteredItems = items.filter((item) => item.id != id);

  if (filteredItems.length === items.length) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Item not found" }));
  } else {
    writeItemsToFile(filteredItems);
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Item deleted" }));
  }
};

module.exports = {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
