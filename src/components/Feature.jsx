import React from "react";

import '../styles/Home.css';

function Feature(props) {

    return (
        <div className="feature col" data-aos={props['data-aos']} data-aos-delay={props['data-aos-delay']}>
            <div className="feature-icon d-inline-flex align-items-center justify-content-center mb-3 p-1">
                <img src={props.icon} alt="Feature Icon"></img>
            </div>
            <h3 className="fs-3 text-body-emphasis">{props.title}</h3>
            {props.title === "Security" ? <p>Your personal data is saved in a database, where sensitive information is encrypted using the latest and greatest technologies.</p> : null}
            {props.title === "Easy management" ? <p>Create, delete, edit... <br></br> Manage your notes or reminders in the best possible way.</p> : null}
            {props.title === "User friendly" ? <p>Easy to use, intuitive and fast. Keeper App&copy; is designed to be used by everyone.</p> : null}
        </div>
    );
}

export default Feature;