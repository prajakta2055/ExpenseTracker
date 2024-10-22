import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Added email state
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use the useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/register', {
                username,
                email,  // Ensure you're including the email
                password,
            });
            console.log(response.data);  // Log response data for debugging
            navigate('/');  // Redirect after successful registration
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);  // Log the error response
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required // Optional: add required attribute
                /><br/>
                <input
                    type="email" // Changed to type "email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required // Optional: add required attribute
                /><br/>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required // Optional: add required attribute
                /><br/>
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Optional: style the error message */}
        </div>
    );
}

export default Register;
