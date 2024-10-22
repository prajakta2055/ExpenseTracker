const express = require('express');
const multer = require('multer');
const router = express.Router();
const Expense = require('../models/Expense'); // Ensure you have an Expense model

// Set up multer for file uploads (for receipts)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Create a new expense with receipt upload
router.post('/add', upload.single('receipt'), async (req, res) => {
    const { category, amount } = req.body;
    const receipt = req.file ? req.file.path : null; // Get the uploaded file path

    const newExpense = new Expense({ category, amount, receipt });

    try {
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating expense' });
    }
});

// Get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find(); // Fetch all expenses from the database
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching expenses' });
    }
});

module.exports = router;
