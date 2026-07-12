const express = require('express');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth.routes');
const articleRoutes = require('./routes/articles.routes');

const app = express();

app.use(express.json());
app.use(logger);

app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);

app.use(errorHandler);

module.exports = app;