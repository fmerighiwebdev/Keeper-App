import React from "react";
import { Link } from "react-router-dom";

import AuthForm from "./AuthForm.jsx";

import "../styles/Auth.css";

function Login() {
    return (
        <section className="auth-section">
            <div class="auth-card shadow">
                <AuthForm type="signup" />
                <p>Already have an account? <Link className="redirect-link" to="/login">Log In</Link></p>
            </div>
        </section>
      );
}

export default Login;