const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});


app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  
  if (!name || !email || !message) {
    return res.status(400).send(`
      <h1>Error: All fields are required!</h1>
      <a href="/">Go Back</a>
    `);
  }

  
  res.send(`
    <h1>Thank You!</h1>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
    <a href="/">Submit another response</a>
  `);
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
