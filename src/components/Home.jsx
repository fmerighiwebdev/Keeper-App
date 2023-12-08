import React from "react";

import { Container } from 'react-bootstrap';

import '../styles/Home.css';
import homeImg from '../images/home-image.svg';

function Home() {
    return (
        <section className="home-section">
        <Container>
            <div className="row align-items-lg-center">
                <div className="col-12 col-lg-6">
                    <h1 className="home-title"><span>Organize</span> and <span>plan</span> your time 
                    and activities in the <span><em>BEST</em></span> possible way.</h1>
                    <p className="home-desc">With Keeper App&copy; you can organize and manage your reminders WHERE 
                    and WHENEVER you want, in an easy, intuitive and fast way.</p>
                </div>
                <div className="col-12 col-lg-6 d-flex justify-content-center">
                    <img className="home-img" src={homeImg} alt="Keeper App" /> 
                </div>
            </div>
        </Container>
        </section>
    );
}

export default Home;