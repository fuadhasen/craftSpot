import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import Navbar from '../components/Navbar';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already logged in by checking for the token
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/dashboard'); // Redirect to dashboard if the user is already logged in
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(
                '/users/login',
                new URLSearchParams({
                    username: formData.username,
                    password: formData.password,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            const { token } = response.data;
            // Store the token securely
            localStorage.setItem('authToken', token);
            setSuccess('Login successful! Redirecting...');
            setError(''); // Clear any previous errors
            setTimeout(() => {
                navigate('/dashboard'); // Redirect to dashboard after successful login
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.detail || 'An error occurred');
            setSuccess(''); // Clear any previous success messages
        }
    };

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>
                    {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="username"
                                placeholder="you@example.com"
                                value={formData.username}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>
                        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition duration-300 w-full">
                            Login
                        </button>
                        <p className="mt-4 text-center text-gray-600">
                            Don{`'`}t have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Login;
