const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');



// Get user details
router.get('/user', auth, async (req, res) => {
    try {
        // Check if req.user is defined
        if (!req.user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Fetch user details excluding password
        const user = await User.findById(req.user.id).select('-password');

        // Check if user is found
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Send user details in response
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// User login
router.post('/login/user',
    [
        check('username', 'Username is required').notEmpty(),
        check('password', 'Password is required').notEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            let user = await User.findOne({ username, role: 'user' });

            if (!user) {
                return res.status(400).json({ msg: 'Invalid User Credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid User Credentials' });
            }

            const payload = {
                user: {
                    id: user.id,
                    role: user.role
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// Manager login
router.post('/login/manager',
    [
        check('username', 'Username is required').notEmpty(),
        check('password', 'Password is required').notEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            let manager = await User.findOne({ username, role: 'manager' });

            if (!manager) {
                return res.status(400).json({ msg: 'Invalid Manager Credentials' });
            }

            const isMatch = await bcrypt.compare(password, manager.password);

            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Manager Credentials' });
            }

            const payload = {
                user: {
                    id: manager.id,
                    role: manager.role
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// Admin login
router.post('/login/admin',
    [
        check('username', 'Username is required').notEmpty(),
        check('password', 'Password is required').notEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            let admin = await User.findOne({ username, role: 'admin' });

            if (!admin) {
                return res.status(400).json({ msg: 'Invalid Admin Credentials' });
            }

            const isMatch = await bcrypt.compare(password, admin.password);

            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Admin Credentials' });
            }

            const payload = {
                user: {
                    id: admin.id,
                    role: admin.role
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
