import React from "react";
import FailedAuth from './FailedAuth';
import "../styles/Dashboard.css";
import { Container } from "react-bootstrap";
import CreateIcon from '@mui/icons-material/Create';
import { checkToken, getUser } from "../client-utils";
import CreateForm from "./CreateForm";

function Dashboard() {

    const token = sessionStorage.getItem('token');
    const [isTokenValid, setIsTokenValid] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState(null);
    const [isActive, setIsActive] = React.useState(false);

    const notes = [
        {
            id: 1,
            title: 'Long Text',
            content: 'Lorem ipsum dolor sit amet consectetur adipi lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipi lorem ipsum dolor sit amet consectetur'
        },
        {
            id: 2,
            title: 'Note 2',
            content: 'Note 2 content'
        },
        {
            id: 3,
            title: 'Note 3',
            content: 'Note 3 content'
        },
        {
            id: 4,
            title: 'Note 4',
            content: 'Note 4 content'
        },
        {
            id: 5,
            title: 'Note 5',
            content: 'Note 5 content'
        },
        {
            id: 6,
            title: 'Note 6',
            content: 'Note 6 content'
        }
    ];

    React.useEffect(() => {
        checkToken(token, setIsTokenValid, setLoading);
        getUser(token, setUser, setLoading);
    }, [token]);

    console.log(user);

    function handleCreateClick() {
        setIsActive(true);
    }

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
            <Container>
                { isTokenValid ? (
                    <>
                        <section className="dashboard">
                            {user ? (
                                <>
                                    <h1>Hi, <span>{user.username}</span></h1>
                                    <div className="notes-grid">
                                        {notes.length > 0 ? (
                                            <>
                                                {notes.map(note => (
                                                    <div className="note" key={note.id}>
                                                        <h2>{note.title}</h2>
                                                        <p>{note.content}</p>
                                                    </div>
                                                ))}
                                            </>
                                        ) : <p>You don't have any notes yet</p>}
                                    </div>
                                </>
                            ) : 'Errore nel caricare i dati'}
                            <button className="create-btn shadow" onClick={handleCreateClick}><CreateIcon style={{ color: 'white', fontSize: '2rem' }} /></button>
                        </section>
                    </>
                ) : <FailedAuth /> }
            </Container>
            {isActive ? (
                <div className="overlay-container">
                    <div className="overlay shadow">
                        <CreateForm setIsActive={setIsActive} />
                    </div>
                </div>
            ) : null}
        </main>
    );
}

export default Dashboard;