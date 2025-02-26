import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/login'); // Redirect to login
    };

    return (
        <div className="home-container">
            <h1>WELCOME TO MY PAGE</h1>
            <p>Thanks for visiting</p>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>

            {/* Footer */}
            <div className="footer">© 2025 Your App Name. All Rights Reserved.</div>
        </div>
    );
};

export default Home;
