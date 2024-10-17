import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Ensure you have jwt-decode installed

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send login request to the backend
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });

            // Extract the token from the response
            const { token } = response.data; // Assuming the response contains a 'token'

            // Store the token in local storage
            localStorage.setItem('token', token);

            // Optionally decode the token to get user info (like roles or ID)
            const decoded = jwtDecode(token);
            console.log('Decoded token:', decoded);

            // Navigate to the home page or dashboard
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed. Please check your credentials.'); // User feedback on error
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b bg-[#E8F5E9]

">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Don’t have an account?
                    <a href="/register" className="text-blue-600 hover:underline"> Register here</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
