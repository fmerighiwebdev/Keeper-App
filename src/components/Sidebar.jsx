import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Header.css';

import { logout } from '../client-utils';

function Sidebar({ setIsTokenValid, category }) {

    const token = sessionStorage.getItem('token');
    const [loading, setLoading] = React.useState(false);

    function handleLogoutClick() {
        setLoading(true);
        logout(token, setLoading);
        setIsTokenValid(false);
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
                <Link to="/dashboard" className={category === "principale" ? "sidebar-btn-active" : "sidebar-btn"} >Principale</Link>
                <Link to="/dashboard/work" className={category === "lavoro" ? "sidebar-btn-active" : "sidebar-btn"} >Lavoro</Link>
            </div>
            <Link onClick={handleLogoutClick} to={'/'} className="logout-side-btn">Esci</Link>
        </aside>
    );
}

export default Sidebar;