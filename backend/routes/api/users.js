const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');

const User = require('../../models/User');

// User registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password,
            role: 'user'
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
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
});
// Admin promotes user to manager
router.put('/promote/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req;

        // Check if the requester is an admin
        if (user.role !== 'admin') {
            return res.status(403).json({ msg: 'Unauthorized' });
        }

        // Find the user by ID
        let targetUser = await User.findById(id);

        if (!targetUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if the target user is not an admin
        if (targetUser.role === 'admin') {
            return res.status(400).json({ msg: 'Cannot promote admin' });
        }

        // Promote the user to manager
        targetUser.role = 'manager';
        await targetUser.save();

        res.json({ msg: 'User promoted to manager' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
