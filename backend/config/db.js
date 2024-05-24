const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const db = process.env.MONGO_URI; // Access the MongoDB URI from environment variables

const connectDB = async () => {
    try {
        if (!db) {
            throw new Error('MONGO_URI is not defined in the environment variables');
        }

        await mongoose.connect(db);

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;
