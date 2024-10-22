// backend/models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    receipt: { type: String }, // Add receipt path (optional)
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
