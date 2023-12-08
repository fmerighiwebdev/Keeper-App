import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

import '../styles/Header.css';
import 'animate.css';

function Header(props) {
    const [isActive, setActive] = useState(false);

    function handleHamClick() {
        setActive(!isActive);
    }

    if (props.type === "home") {
        return (
            <>
            <header className="shadow">
            <Container>
                <nav>
                    <div>
                        <Link className="header-logo" to="/">Keeper App <TipsAndUpdatesTwoToneIcon /></Link>
                    </div>
                    <div className="header-links">
                        <Link className="navbar-link" to="/login">Log In</Link>
                        <Link className="navbar-link" to="/signup">Sign Up</Link>
                    </div>
                    <div onClick={handleHamClick} className="hamburger">
                        <div className={isActive ? "bar active" : "bar"}></div>
                        <div className={isActive ? "bar active" : "bar"}></div>
                        <div className={isActive ? "bar active" : "bar"}></div>
                    </div>
                </nav>
            </Container>
            </header>
            {isActive ? <div className="mobile-menu animate__animated animate__fadeInDown animate__faster">
                <Link className="navbar-link" to="/login">Log In</Link>
                <Link className="navbar-link" to="/signup">Sign Up</Link>
            </div> : null}
            </>
        );
    } else if (props.type === "auth") {
        return (
            <>
            <header className="shadow">
            <Container>
                <nav>
                    <div>
                        <Link className="header-logo" to="/"><ArrowBackTwoToneIcon/> Back to Home</Link>
                    </div>
                </nav>
            </Container>
            </header>
            </>
        );
    }

}

export default Header;