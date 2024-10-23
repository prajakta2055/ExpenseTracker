// src/components/ExpenseChart.js
import React from 'react';

const ExpenseChart = ({ expenses }) => {
    // Summarize expenses by category
    const expenseSummary = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    // Prepare data for the pie chart
    const data = Object.keys(expenseSummary).map(category => ({
        name: category,
        value: expenseSummary[category],
    }));

    // Calculate total expenses for percentage calculations
    const total = data.reduce((sum, expense) => sum + expense.value, 0);

    // Function to calculate the coordinates for each pie slice
    const getPath = (startAngle, endAngle) => {
        const radius = 100; // Radius of the pie chart
        const x1 = radius * Math.cos(startAngle);
        const y1 = radius * Math.sin(startAngle);
        const x2 = radius * Math.cos(endAngle);
        const y2 = radius * Math.sin(endAngle);
        const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0; // Determine if the arc is greater than 180 degrees

        return `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    };

    // Prepare paths for each slice of the pie chart
    const paths = [];
    let startAngle = 0; // Initialize the start angle

    data.forEach((slice, index) => {
        const endAngle = startAngle + (slice.value / total) * 2 * Math.PI;
        paths.push({
            path: getPath(startAngle, endAngle),
            fill: `hsl(${(index * 360) / data.length}, 70%, 50%)`, // Generate color based on index
            endAngle,
            midAngle: (startAngle + endAngle) / 2, // Calculate midpoint angle for label placement
            name: slice.name,
        });
        startAngle = endAngle; // Update start angle for next slice
    });

    return (
        <div>
            <h2>Expense Distribution</h2>
            {data.length === 0 ? (
                <p>No expenses to display</p> // Message if there are no expenses
            ) : (
                <svg width={400} height={400}>
                    <g transform="translate(200, 200)">
                        {paths.map((slice, index) => (
                            <g key={`slice-${index}`}>
                                <path d={slice.path} fill={slice.fill} />
                                {/* Calculate label position */}
                                <text
                                    x={(100 * 0.5) * Math.cos(slice.midAngle)} // Adjust x position
                                    y={(100 * 0.5) * Math.sin(slice.midAngle)} // Adjust y position
                                    fill="white"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="12"
                                >
                                    {slice.name}
                                </text>
                            </g>
                        ))}
                    </g>
                </svg>
            )}
        </div>
    );
};

export default ExpenseChart;
