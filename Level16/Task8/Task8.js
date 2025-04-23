const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); 


let products = [];
let nextId = 1;


app.get('/products', (req, res) => {
  res.status(200).json(products);
});


app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(product);
});


app.post('/products', (req, res) => {
  const { name, price, description } = req.body;
  if (!name || price == null || !description) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const newProduct = {
    id: nextId++,
    name,
    price,
    description
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});


app.put('/products/:id', (req, res) => {
  const { name, price, description } = req.body;
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  if (!name || price == null || !description) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  product.name = name;
  product.price = price;
  product.description = description;

  res.status(200).json(product);
});


app.delete('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const deletedProduct = products.splice(index, 1);
  res.status(200).json({ message: 'Product deleted', product: deletedProduct[0] });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
