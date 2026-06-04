const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Forces Node to use Google DNS

require('dotenv').config();  // Load .env variables before anything 


const express = require('express');
const mongoose = require('mongoose');

const articleRoutes = require('./routes/articles.routes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(logger);
app.use('/articles', articleRoutes);
app.use(errorHandler);

// Check if MONGO_URI exists
if (!process.env.MONGO_URI) {
    console.error('ERROR: MONGO_URI is not defined in .env file');
    process.exit(1);
}

// After require('dotenv').config()
console.log('PORT from env:', process.env.PORT);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });