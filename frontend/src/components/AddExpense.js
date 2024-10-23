import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AddExpense() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate instead of history

  // Define categories
  const categories = [
    'Food',
    'Transport',
    'Utilities',
    'Entertainment',
    'Healthcare',
    'Groceries',
    'Others',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('userId'); // Assuming you're storing userId in localStorage
    if (!token) {
      navigate('/'); // Redirect to home if no token is found
      return;
    }

    try {
      const formData = new FormData();
      formData.append('amount', amount);
      formData.append('category', category);
      if (receipt) formData.append('receipt', receipt);

      await axios.post('http://localhost:5000/expense/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/dashboard'); // Use navigate instead of history.push
    } catch (err) {
      setError('An error occurred while adding the expense. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        /><br/>

        {/* Dropdown for category selection */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select><br/>

        <input
          type="file"
          accept="image/*" // Accept only image files
          onChange={(e) => setReceipt(e.target.files[0])}
        /><br/>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
