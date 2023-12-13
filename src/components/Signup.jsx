import React from "react";
import { Link } from "react-router-dom";

import AuthForm from "./AuthForm.jsx";

import "../styles/Auth.css";

function Signup() {
    return (
        <section className="auth-section">
            <div className="auth-card shadow">
                <AuthForm type="signup" />
                <p>Already have an account? <Link className="redirect-link" to="/login">Log In</Link></p>
            </div>
        </section>
    );
}

export default Signup;