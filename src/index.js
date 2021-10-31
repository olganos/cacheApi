const cache = require('./routes/cache');
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cacheApi')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

const app = express();

app.use(express.json()); 

app.use('/api/cache', cache);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
