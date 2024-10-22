// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import Home from './components/Home';  
import Register from './components/Register';

function App() {
  return (
    <Routes>
            <Route path="/" element={<div className="background"><Home /></div>} />
            <Route path="/login" element={<div className="background"><Login /></div>} />
            <Route path="/register" element={<div className="background"><Register /></div>} />
            <Route path="/dashboard" element={<div className="background"><Dashboard /></div>} />
            <Route path="/expense/add" element={<div className="background"><AddExpense /></div>} />
        </Routes>
  );
}

export default App;
