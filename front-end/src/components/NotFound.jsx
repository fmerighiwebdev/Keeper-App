import React from 'react';
import { Link } from 'react-router-dom';

import error404 from '../images/error-404.svg';

function NotFound() {
    return (
        <section className='not-found'>
            <img src={error404} alt='404 Not Found' />
            <h2 style={{ color: 'white' }}>Pagina non trovata</h2>
            <p>La pagina che stai cercando potrebbe essere stata rimossa o non è disponibile.</p>
            <Link className="redirect-link" to='/'>Torna alla Home</Link>
        </section>
    );
}

export default NotFound;