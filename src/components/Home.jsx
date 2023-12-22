import React from "react";

import { Container } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

import '../styles/Home.css';
import homeImg from '../images/home-image.svg';
import securityIcon from '../images/security-icon.svg';
import managementIcon from '../images/management-icon.svg';
import userFriendlyIcon from '../images/ui-icon.svg';
import { Link } from "react-router-dom";
import { checkToken } from "../client-utils.js";
import Feature from "./Feature";


function Home() {

    const token = sessionStorage.getItem('token');
    const [isTokenValid, setIsTokenValid] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        AOS.init();
        checkToken(token, setIsTokenValid, setLoading);
    }, [token]);

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
        <section className="home-section">
        <Container>
            <div className="row align-items-lg-center animate__animated animate__zoomInDown">
                <div className="col-12 col-lg-6">
                    <h1 className="home-title"><span>Organize</span> and <span>plan</span> your time 
                    and activities in the <span><em>BEST</em></span> possible way.</h1>
                    <p className="home-desc">With Keeper App&copy; you can organize and manage your reminders WHERE 
                    and WHENEVER you want, in an easy, intuitive and fast way.</p>
                    <Link className="home-btn animate__animated animate__heartBeat animate__delay-2s" to={isTokenValid ? '/dashboard' : '/signup'}>{isTokenValid ? 'Go to dashboard' : 'Sign up for free'}</Link>
                </div>
                <div className="col-12 col-lg-6 d-flex justify-content-center">
                    <img className="home-img" src={homeImg} alt="Keeper App" /> 
                </div>
            </div>

            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3 features">
                <Feature title="Security" icon={securityIcon} data-aos="fade-up" />
                <Feature title="Easy management" icon={managementIcon} data-aos="fade-up" data-aos-delay="200" />
                <Feature title="User friendly" icon={userFriendlyIcon} data-aos="fade-up" data-aos-delay="400" />
            </div>
        </Container>
        </section>
    );
}

export default Home;