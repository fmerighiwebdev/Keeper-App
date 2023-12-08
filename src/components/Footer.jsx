import React from 'react';

import { Container } from 'react-bootstrap';

import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <Container>
                <div className="row">
                    <div className="col-12">
                        <p className="footer-text">Keeper App&copy; {new Date().getFullYear()}</p>
                        <p className='credits'>Developed by <a href='https://www.linkedin.com/in/francesco-merighi-373939217/'>Francesco Merighi</a></p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;