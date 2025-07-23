const express = require('express');
const app = express();
const PORT = 3000;


app.get('/search', (req, res) => {
  const { q, limit = 5 } = req.query; 

  if (!q) {
    return res.send("Missing search query (q)");
  }

  res.send(`Search for: ${q}, Limit: ${limit}`);
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
