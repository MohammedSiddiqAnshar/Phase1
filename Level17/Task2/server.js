const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const app = express();
const PORT = 3000;

dotenv.config();


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB error:', err.message));


app.get('/test-user-schema', (req, res) => {
  const schemaFields = Object.keys(User.schema.paths).reduce((acc, key) => {
    acc[key] = User.schema.paths[key].instance;
    return acc;
  }, {});
  res.json({
    model: 'User',
    fields: schemaFields
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
