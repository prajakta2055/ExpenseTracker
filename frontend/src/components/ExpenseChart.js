// src/components/ExpenseChart.js
import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
    // Check if there are any expenses
    if (!expenses || expenses.length === 0) {
        return <p>No expense data available to display charts.</p>;
    }

    // Prepare data for the pie chart
    const pieData = {
        labels: expenses.map(expense => expense.category),
        datasets: [
            {
                data: expenses.map(expense => expense.amount),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
            },
        ],
    };

    // Prepare data for the line graph
    const lineData = {
        labels: expenses.map(expense => expense.category),
        datasets: [
            {
                label: 'Expenses',
                data: expenses.map(expense => expense.amount),
                borderColor: '#42A5F5',
                borderWidth: 2,
                fill: false,
                tension: 0.4, // Smoothing the line
            },
        ],
    };

    return (
        <div>
            <h2>Expense Distribution</h2>
            <Pie data={pieData} />
            <h2>Expenses Over Categories</h2>
            <Line data={lineData} />
        </div>
    );
};

export default ExpenseChart;
