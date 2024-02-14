import React from 'react';

import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer-text">Keeper App&copy; {new Date().getFullYear()}</p>
            <p className='credits'>Credits: <a href='https://www.linkedin.com/in/francesco-merighi-373939217/'>Francesco Merighi</a></p>
        </footer>
    );
}

export default Footer;