import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone';
import { checkToken } from "../client-utils.js";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { logout } from "../client-utils.js";

import '../styles/Header.css';
import 'animate.css';

function Header(props) {
    const [isMenuActive, setMenuActive] = useState(false);
    const [isProfileActive, setProfileActive] = useState(false);
    const token = sessionStorage.getItem('token');
    const [isTokenValid, setIsTokenValid] = useState(null);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        checkToken(token, setIsTokenValid, setLoading);
    }, [token]);

    function handleHamClick() {
        setMenuActive(!isMenuActive);
    }

    function handleProfileClick() {
        setProfileActive(!isProfileActive);
    }

    function handleLogoutClick() {
        logout(token, setLoading);
        setProfileActive(false);
        setIsTokenValid(false);
    }

    if (loading) {
        return ( 
            <main className="loading-page">
                <div className="spinner-grow" style={{ width: '2rem', height: '2rem', color: 'orange'}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </main>
        );
    }

    return (
        <>
        <header>
            <Container>
                <nav>
                    <div>
                        <Link className="header-logo" to="/">Keeper App <TipsAndUpdatesTwoToneIcon /></Link>
                    </div>
                    {props.type === "home" && !isTokenValid ? (
                        <div className="header-links">
                            <Link className="navbar-link" to="/login">Log In</Link>
                            <Link className="navbar-link" to="/signup">Sign Up</Link>
                        </div>
                    ) : null}
                    {isTokenValid ? (
                        <>
                        <button onClick={handleProfileClick} className="profile-icon">
                            <AccountCircleIcon style={{ fontSize: '3rem', color: '#f4b400' }} />
                        </button>
                        {isProfileActive ? (
                            <div className="drop-menu shadow">
                                <Link onClick={handleLogoutClick} to={'/'} className="dropdown-item">Log Out</Link>
                            </div>
                        ) : null}
                        </>
                    ) : null}
                    {props.type === "home" && !isTokenValid ? (
                        <div onClick={handleHamClick} className="hamburger">
                            <div className={isMenuActive ? "bar active" : "bar"}></div>
                            <div className={isMenuActive ? "bar active" : "bar"}></div>
                            <div className={isMenuActive ? "bar active" : "bar"}></div>
                        </div>
                    ) : null}
                </nav>
            </Container>
        </header>
        {isMenuActive && props.type === "home" ? (
            <div className="mobile-menu animate__animated animate__fadeInDown animate__faster">
                <Link className="navbar-link" to="/login">Log In</Link>
                <Link className="navbar-link" to="/signup">Sign Up</Link>
            </div>
        ) : null}
        </>
    );

}

export default Header;