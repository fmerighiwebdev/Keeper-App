import React from "react";
import FailedAuth from './FailedAuth';

import { checkToken } from "../client-utils";

function Dashboard() {

    const token = sessionStorage.getItem('token');
    const [isTokenValid, setIsTokenValid] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        checkToken(token, setIsTokenValid, setLoading);
    }, [token]);

    if (loading) {
        return ( 
            <main className="loading-page">
                <div className="spinner-grow" style={{ width: '2rem', height: '2rem', color: 'orange'}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </main>
        );
    }

    return (
        <main>
            <h1>Dashboard</h1>
            { isTokenValid ? <p>Token valido - Dashboard</p> : <FailedAuth /> }
        </main>
    );
}

export default Dashboard;