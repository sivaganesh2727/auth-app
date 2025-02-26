import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Fetch user data
        axios.get('http://localhost:8080/api/auth/user', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => setUser(response.data.user))
        .catch(() => {
            localStorage.removeItem('token'); // Remove invalid token
            navigate('/login');
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="home-container">
            <h1>WELCOME {user ? user.name : "Guest"} TO MY PAGE</h1>
            <p>Thanks for visiting</p>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <div className="footer">© 2025 Your App Name. All Rights Reserved.</div>
        </div>
    );
};

export default Home;
