import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error('All fields are required!', { position: "top-right" });
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', formData);
            toast.success(response.data.message || 'Login successful!', { position: "top-right" });

            localStorage.setItem('token', response.data.token); // Store token
            navigate('/home');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed!', { position: "top-right" });
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email..."
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password..."
                    required
                />
                <button type="submit">Login</button>
            </form>
            <div className="signup-link">
                Don't have an account? <Link to="/signup">Signup</Link>
            </div>
            <div className="footer">© 2025 Your App Name. All Rights Reserved.</div>
        </div>
    );
};

export default Login;
