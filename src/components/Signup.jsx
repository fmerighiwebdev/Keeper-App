import React from "react";
import { Link } from "react-router-dom";

import AuthForm from "./AuthForm.jsx";

import "../styles/Auth.css";

function Signup() {
    return (
        <section className="auth-section">
            <div className="auth-card shadow-lg fade-in-up">
                <AuthForm type="signup" />
                <p>Sei già in possesso di un account? <Link className="redirect-link" to="/login">Accedi</Link></p>
            </div>
        </section>
    );
}

export default Signup;