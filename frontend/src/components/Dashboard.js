// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExpenseChart from './ExpenseChart';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/expense'); // Fetch expenses from API
        setExpenses(response.data);
      } catch (err) {
        console.error(err);
        // Optionally handle navigation if there's an error
        // navigate('/');
      }
    };

    fetchExpenses();
  }, []);

  const handleAddExpense = () => {
    navigate('/expense/add');
  };

  const handleLogout = () => {
    localStorage.removeItem('userId'); // Clear user data
    navigate('/login'); // Redirect to login page
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Dashboard</h2>
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
      </div>
      <button onClick={handleAddExpense} style={{ marginBottom: '20px' }}>Add Expense</button>
      
      {/* Display total expenses */}
      <h3>Total Expenses: ${totalExpenses.toFixed(2)}</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Expense</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{expense.category}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>${expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '40px' }}>
        <h3>Expense Distribution</h3>
        <ExpenseChart expenses={expenses} />
      </div>
    </div>
  );
}

export default Dashboard;
