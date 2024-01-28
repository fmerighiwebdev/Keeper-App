import React from "react";
import { Link } from "react-router-dom";

import sessionExpImg from "../images/session-expired.svg";
import "../styles/Auth.css";

function FailedAuth() {
    return (
        <main className="failed-auth">
            <img src={sessionExpImg} alt="Session Expired" />
            <p>La sessione è scaduta. <br></br> Si prega di <Link className="redirect-link" to='/login'>accedere</Link></p>
            <Link className="redirect-link" to='/'>Torna alla Home</Link>
        </main>
    );
}

export default FailedAuth;