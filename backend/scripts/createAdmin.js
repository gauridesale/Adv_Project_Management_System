// createAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config(); // Load environment variables from .env file
const User = require('../models/User'); // Import the User model
const connectDB = require('../config/db'); // Import the connectDB function

connectDB();

const createAdmin = async () => {
    const username = process.env.ADMIN_USERNAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const role = 'admin';

    try {
        let user = await User.findOne({ email });

        if (user) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        user = new User({
            username,
            email,
            password,
            role
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        console.log('Admin user created');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

createAdmin();
