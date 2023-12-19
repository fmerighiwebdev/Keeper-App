import React from "react";
import { Link } from "react-router-dom";

import sessionExpImg from "../images/session-expired.svg";
import "../styles/Auth.css";

function FailedAuth() {
    return (
        <main className="failed-auth">
            <img src={sessionExpImg} alt="Session Expired" />
            <p>The session has expired. <br></br> Please <Link className="redirect-link" to='/login'>log in</Link></p>
        </main>
    );
}

export default FailedAuth;