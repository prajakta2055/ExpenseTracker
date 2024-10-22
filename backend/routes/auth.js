// backend/routes/auth.js
const express = require('express');
const User = require('../models/User'); // Ensure the User model is imported correctly
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if email, username, and password are provided
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
    }

    // Create a new user without hashing the password
    const newUser = new User({ username, email, password });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);  // Log error for debugging
        res.status(500).json({ error: 'Error registering user' });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' }); // User not found
    }

    // Compare the provided password with the stored password
    if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' }); // Password does not match
    }

    // If login is successful
    res.status(200).json({ message: 'Login successful', userId: user._id });
});

module.exports = router;
