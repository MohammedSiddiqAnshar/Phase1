const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const app = express();
const PORT = 3000;

dotenv.config();
app.use(express.json()); 


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB error:', err.message));


app.post('/api/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;

   
    if (!name || !email || !age) {
      return res.status(400).json({ error: 'All fields (name, email, age) are required.' });
    }

   
    const newUser = new User({ name, email, age });
    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (err) {
    
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }

    
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
