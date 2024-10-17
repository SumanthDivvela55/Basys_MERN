const express = require('express');
const router = express.Router();
const authRequestController = require('../controllers/authRequestController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Ensure bcrypt is imported
const User = require('../models/User');

// Authentication request routes
router.post('/request', authRequestController.createAuthRequest);
router.get('/requests', authRequestController.getAuthRequests);
router.put('/request/:id', authRequestController.updateAuthRequest);

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    // Since JWT is stateless, we don't have to do much here.
    // Typically, you'd clear a session or token on the client side.
    res.json({ message: 'Logout successful' });
});

module.exports = router;
