import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone';
import { checkToken } from "../client-utils.js";

import '../styles/Header.css';
import 'animate.css';

function Header(props) {
    const [isActive, setActive] = useState(false);
    const token = sessionStorage.getItem('token');
    const [isTokenValid, setIsTokenValid] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        checkToken(token, setIsTokenValid, setLoading);
    }, [token]);

    function handleHamClick() {
        setActive(!isActive);
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
                    {isTokenValid ? <p>Prova prova</p> : null}
                    {props.type === "home" && !isTokenValid ? (
                        <div onClick={handleHamClick} className="hamburger">
                            <div className={isActive ? "bar active" : "bar"}></div>
                            <div className={isActive ? "bar active" : "bar"}></div>
                            <div className={isActive ? "bar active" : "bar"}></div>
                        </div>
                    ) : null}
                </nav>
            </Container>
        </header>
        {isActive && props.type === "home" ? (
            <div className="mobile-menu animate__animated animate__fadeInDown animate__faster">
                <Link className="navbar-link" to="/login">Log In</Link>
                <Link className="navbar-link" to="/signup">Sign Up</Link>
            </div>
        ) : null}
        </>
    );

}

export default Header;