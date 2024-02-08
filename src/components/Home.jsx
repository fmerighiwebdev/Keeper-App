import React from "react";
import { Link } from "react-router-dom";

import '../styles/Home.css';

import { checkToken, getUser } from "../client-utils.js";

function Home() {

    const token = sessionStorage.getItem('token');
    const [isTokenValid, setIsTokenValid] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        checkToken(token, setIsTokenValid, setLoading);
        getUser(token, setUser, setLoading);
    }, [token]);

    if (loading) {
        return ( 
            <main className="loading-page">
                <div className="spinner-grow" style={{ width: '2rem', height: '2rem', color: 'greenyellow'}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </main>
        );
    }

    return (
        <section className="home-section">
            <svg className="logo" viewBox="0 0 83 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_135_41)">
                <path className="fade-in delay-2" d="M75.922 17.6397L76.849 16.7127C77.5864 15.9753 78.0007 14.9751 78.0007 13.9322C78.0007 12.8893 77.5864 11.8892 76.849 11.1517C76.1116 10.4143 75.1114 10 74.0685 10C73.0256 10 72.0254 10.4143 71.288 11.1517L70.361 12.0787L61.839 20.5987C61.262 21.1767 60.973 21.4657 60.725 21.7837C60.4321 22.159 60.181 22.5651 59.976 22.9947C59.803 23.3587 59.674 23.7467 59.416 24.5207L58.322 27.8017M75.922 17.6397C75.922 17.6397 73.953 17.5237 72.215 15.7857C70.477 14.0487 70.362 12.0787 70.362 12.0787M75.922 17.6397L67.401 26.1597C66.824 26.7367 66.535 27.0257 66.217 27.2737C65.8417 27.5666 65.4357 27.8178 65.006 28.0227C64.642 28.1957 64.255 28.3247 63.48 28.5827L60.199 29.6767M60.199 29.6767L59.397 29.9447C59.21 30.0074 59.0093 30.0167 58.8174 29.9716C58.6254 29.9264 58.4499 29.8287 58.3105 29.6893C58.171 29.5498 58.0733 29.3743 58.0281 29.1823C57.983 28.9904 57.9923 28.7897 58.055 28.6027L58.323 27.8007L60.199 29.6767Z" stroke="#70D343" stroke-width="1.5" shape-rendering="crispEdges"/>
                </g>
                <g filter="url(#filter1_d_135_41)">
                <path className="fade-in" d="M55.2563 35L76.4753 45.2563L70.1092 58.4269L58.1707 62.585L45.0001 56.2189L55.2563 35ZM56.3526 38.1475L48.1476 55.1227L57.6961 59.738L61.2858 52.3114L68.7125 55.901L73.3278 46.3525L56.3526 38.1475ZM66.1867 57.2978L62.3821 55.4589L60.5431 59.2634L66.1867 57.2978ZM56.4233 43.4169L69.1546 49.5707L68.129 51.6926L55.3976 45.5388L56.4233 43.4169ZM54.372 47.6607L59.6767 50.2248L58.6511 52.3467L53.3464 49.7826L54.372 47.6607Z" fill="#70D343"/>
                </g>
                <g filter="url(#filter2_d_135_41)">
                <path className="fade-in delay-1" d="M6 18.1943L44.2869 4.00016L53.0972 27.7648L43.9588 47.6709L20.1942 56.4812L6 18.1943ZM11.2481 20.6036L22.6034 51.2331L39.8325 44.8457L34.8646 31.4453L48.265 26.4774L41.8776 9.24827L11.2481 20.6036ZM46.9775 31.3096L40.1127 33.8546L42.6577 40.7194L46.9775 31.3096ZM17.9156 26.8416L40.8878 18.3251L42.3072 22.1538L19.335 30.6703L17.9156 26.8416ZM20.7545 34.4989L30.3262 30.9504L31.7456 34.7791L22.1739 38.3276L20.7545 34.4989Z" fill="#70D343"/>
                </g>
                <defs>
                <filter id="filter0_d_135_41" x="53.25" y="9.25" width="29.5005" height="29.4995" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_135_41"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_135_41" result="shape"/>
                </filter>
                <filter id="filter1_d_135_41" x="39" y="31" width="43.4751" height="39.585" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="2"/>
                <feGaussianBlur stdDeviation="3"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_135_41"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_135_41" result="shape"/>
                </filter>
                <filter id="filter2_d_135_41" x="0" y="0" width="59.0972" height="64.4814" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="2"/>
                <feGaussianBlur stdDeviation="3"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_135_41"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_135_41" result="shape"/>
                </filter>
                </defs>
            </svg>
            <h1 className="home-title bounce-in delay-3">Keeper App</h1>
            {isTokenValid ? (
                <div className="already-logged fade-in-up delay-4">
                    <Link to="/dashboard" className="go-dashboard-btn">Vai alla Dashboard</Link>
                    <p>Accesso eseguito come: <span>{user && user.username}</span></p>
                </div>
            ) : (
                <div className="home-links">
                    <Link to="/login" className="login-btn fade-in-up delay-4">Accedi</Link>
                    <Link to="/signup" className="signup-btn fade-in-up delay-btn">Registrati</Link>
                </div> 
            )}
        </section>
    );
}

export default Home;