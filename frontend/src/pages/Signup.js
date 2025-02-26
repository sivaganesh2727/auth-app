import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Signup.css'; // Import CSS file

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            toast.error('All fields are required!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/auth/signup', formData);
            toast.success(response.data.message || 'Signup successful! Please login.', { position: "top-right" });
            navigate('/login');
        } catch (error) {
            if (error.response?.status === 400) {
                toast.warn('Already registered! Please login.', { position: "top-right" });
            } else {
                toast.error(error.response?.data?.message || 'Signup failed!', { position: "top-right" });
            }
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name..."
                    required
                />
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
                <button type="submit">Signup</button>
            </form>
            <div className="signup-link">
                Already have an account? <Link to="/login">Login</Link>
            </div>

            {/* Footer */}
            <div className="footer">© 2025 Your App Name. All Rights Reserved.</div>
        </div>
    );
};

export default Signup;
