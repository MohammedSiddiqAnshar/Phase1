const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;


app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});


app.get('/error', (req, res, next) => {
  const err = new Error('Manual error thrown!');
  err.status = 500;
  next(err);
});


app.get('/resource/:id', (req, res, next) => {
  const resource = null; 
  if (!resource) {
    const err = new Error(`Resource with ID ${req.params.id} not found`);
    err.status = 404;
    return next(err);
  }
  res.send(resource);
});

app.use((req, res, next) => {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});


app.use((err, req, res, next) => {
  const env = process.env.NODE_ENV || 'development';
  const status = err.status || 500;

  const errorResponse = {
    message: err.message,
    ...(env === 'development' && { stack: err.stack })
  };


  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    res.status(status).json(errorResponse);
  } else {
    
    res.status(status).render('error', {
      message: err.message,
      stack: env === 'development' ? err.stack : ''
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
