const express = require('express');
require('dotenv').config(); // Load environment variables from .env file
const connectDB = require('./config/db'); // Import the connectDB function
const cors = require('cors');

const app = express();

// Use CORS middleware
app.use(cors());

// Connect to the database
connectDB();

// Initialize middleware
app.use(express.json());

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
// app.use('/api/project', require('./routes/api/project'));
// app.use('/api/tasks', require('./routes/api/tasks'));
// app.use('/api/subtasks', require('./routes/api/subtasks'));
// app.use('/api/timeentries', require('./routes/api/timeEntries'));


// Set up the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
