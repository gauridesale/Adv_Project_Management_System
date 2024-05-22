const express = require('express');
require('dotenv').config(); // Load environment variables from .env file
const connectDB = require('./config/db'); // Import the connectDB function

const app = express();

// Connect to the database
connectDB();

// Initialize middleware
app.use(express.json());

// Define routes
app.use('/api/auth', require('./routes/api/auth'));

// Set up the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
