import express, { json } from 'express';
import { port } from './port.js';
import { items } from './items.js';
const app = express();
// Middleware to parse JSON bodies
app.use(json());

app.get('/', (req, res) => {
  res.send('Welcome to my API at Port 3000');  // Sends 'Welcome to my API' as the response
});

// GET endpoint to retrieve all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET endpoint to retrieve a single item by ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send({ message: 'Item not found' });
  }
});

// POST endpoint to create a new item
app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT endpoint to update an existing item
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);
  if (itemIndex > -1) {
    items[itemIndex].name = req.body.name;
    res.json(items[itemIndex]);
  } else {
    res.status(404).send({ message: 'Item not found' });
  }
});

// DELETE endpoint to remove an item
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);
  if (itemIndex > -1) {
    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
  } else {
    res.status(404).send({ message: 'Item not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});

