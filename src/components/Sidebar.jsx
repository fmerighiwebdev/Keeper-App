import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Header.css';

import { logout } from '../client-utils';

function Sidebar({ setIsTokenValid, setIsMenuActive , type }) {

    const token = sessionStorage.getItem('token');
    const [loading, setLoading] = React.useState(false);

    function handleLogoutClick() {
        setLoading(true);
        logout(token, setLoading);
        setIsTokenValid(false);
    }

    function handleMenuTypeClick() {
        setIsMenuActive(false);
    }

    if (loading) {
        return (
            <main className="loading-page">
                <div className="spinner-grow" style={{ width: '2rem', height: '2rem', color: 'greenyellow' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </main>
        );
    }

    return (
        <aside className="side-bar-links slide-from-right shadow-lg">
            <div class="upper-side">
                <Link to="/dashboard" className="sidebar-btn" onClick={handleMenuTypeClick}>Principale</Link>
                <Link to="/dashboard/work" className="sidebar-btn" onClick={handleMenuTypeClick}>Lavoro</Link>
            </div>
            <Link onClick={handleLogoutClick} to={'/'} className="logout-side-btn">Log Out</Link>
        </aside>
    );
}

export default Sidebar;