console.log("🚀 Starting backend...");

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const generateRoute = require('./routes/generate');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/generate', generateRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
