const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;


app.use(express.static('public'));


if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});


const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const isValid = allowed.test(path.extname(file.originalname).toLowerCase());
  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});



app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('<h1>Upload failed</h1><p>No file received or invalid type.</p><a href="/">Try again</a>');
  }

  res.send(`
    <h1>Upload Successful!</h1>
    <p><strong>Original Name:</strong> ${req.file.originalname}</p>
    <p><strong>Stored As:</strong> ${req.file.filename}</p>
    <p><strong>Size:</strong> ${req.file.size} bytes</p>
    <a href="/">Upload another file</a>
  `);
});


app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes('Only image')) {
    return res.status(400).send(`<h1>Error: ${err.message}</h1><a href="/">Try again</a>`);
  }
  next(err);
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
