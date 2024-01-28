import React from 'react';
import { Link } from 'react-router-dom';

import Sidebar from './Sidebar';

import '../styles/Header.css';

import { logout, getUser } from '../client-utils';

function Header( { setIsTokenValid, type }) {

    const token = sessionStorage.getItem('token');
    const [loading, setLoading] = React.useState(true);
    const [isMenuActive, setIsMenuActive] = React.useState(false);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        getUser(token, setUser, setLoading);
    }, [token]);

    function handleLogoutClick() {
        logout(token, setLoading);
        setIsTokenValid(false);
    }

    function handleMenuClick() {
        setIsMenuActive(!isMenuActive);
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
        <>
        <div class="dashboard-header">
            <h1>Ciao, <span>{user && user.username}</span></h1>
            <div className="dashboard-header-links">
                <div className="dashboard-nav-links">
                    <Link to="/dashboard" className="dashboard-btn">Principale</Link>
                    <Link to="/dashboard/work" className="dashboard-btn">Lavoro</Link>
                </div>
                <Link onClick={handleLogoutClick} to={'/'} className="logout-btn">Log Out</Link>
            </div>
            <div className="hamburger-menu" onClick={handleMenuClick}>
                <div className={isMenuActive ? "line active" : "line"}></div>
                <div className={isMenuActive ? "line active" : "line"}></div>
                <div className={isMenuActive ? "line active" : "line"}></div>
            </div>
        </div>
        {isMenuActive ? <Sidebar setIsTokenValid={setIsTokenValid} setIsMenuActive={setIsMenuActive} isMenuActive={isMenuActive} type={type} /> : null}
        </>
    );
}

export default Header;