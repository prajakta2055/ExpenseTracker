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
        const response = await axios.get('http://localhost:5000/expense'); // No token needed
        setExpenses(response.data);
      } catch (err) {
        console.error(err);
        navigate('/');
      }
    };

    fetchExpenses();
  }, [navigate]);

  const handleAddExpense = () => {
    navigate('/expense/add');
  };

  const handleLogout = () => {
    localStorage.removeItem('userId'); // Clear user data
    navigate('/login'); // Redirect to login page
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Dashboard</h2>
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
      </div>
      <button onClick={handleAddExpense} style={{ marginBottom: '20px' }}>Add Expense</button>
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
    </div>
  );
}

export default Dashboard;
