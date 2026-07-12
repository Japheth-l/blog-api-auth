require('dotenv').config();
const mongoose = require('mongoose');
const checkEnv = require('./src/config/checkEnv');
const app = require('./src/app');

// Exit early if any required environment variable is missing
checkEnv();

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000, // wait 10s before timing out
  socketTimeoutMS: 45000,
  family: 4, // force IPv4 to avoid DNS resolution issues on restricted networks
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));