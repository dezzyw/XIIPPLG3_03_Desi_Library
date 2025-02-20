const express = require('express');
const bodyParser = require('body-parser');
const categoriesRoutes = require('./routes/categories');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/kategori', categoriesRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
