import React from "react";
import { Link } from "react-router-dom";

import AuthForm from "./AuthForm.jsx";

import "../styles/Auth.css";

function Login(props) {
    return (
        <section className="auth-section">
            <div className="auth-card shadow">
                <AuthForm type="login" />
                <p>Didn't have an account? <Link className="redirect-link" to="/signup">Sign Up</Link></p>
            </div>
        </section>
    );
}

export default Login;