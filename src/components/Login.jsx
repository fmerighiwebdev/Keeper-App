import React from "react";
import { Link } from "react-router-dom";

import AuthForm from "./AuthForm.jsx";

import "../styles/Auth.css";

function Login() {
    return (
        <section className="auth-section">
            <div className="auth-card shadow-lg fade-in-up">
                <AuthForm type="login" />
                <p>Non hai un account? <Link className="redirect-link" to="/signup">Registrati</Link></p>
            </div>
        </section>
    );
}

export default Login;