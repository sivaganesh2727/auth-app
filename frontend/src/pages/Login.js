import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Signup.css'; // Reuse the same CSS

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error('All fields are required!', { position: "top-right" });
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/auth/login', formData);
            toast.success(response.data.message || 'Login successful!', { position: "top-right" });

            // Save token to localStorage
            localStorage.setItem('token', response.data.token);

            // Redirect to Home page
            navigate('/home');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed! Invalid credentials.', { position: "top-right" });
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

            {/* Footer */}
            <div className="footer">© 2025 Your App Name. All Rights Reserved.</div>
        </div>
    );
};

export default Login;
