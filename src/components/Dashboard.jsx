import React from "react";
import FailedAuth from './FailedAuth';
import "../styles/Dashboard.css";
import { Container } from "react-bootstrap";
import CreateIcon from '@mui/icons-material/Create';
import { checkToken, getUser, getNotes } from "../client-utils";
import CreateForm from "./CreateForm";
import Note from "./Note";

function Dashboard() {

    const token = sessionStorage.getItem('token');
    const [isTokenValid, setIsTokenValid] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState(null);
    const [isCreateActive, setIsCreateActive] = React.useState(false);
    const [notes, setNotes] = React.useState([]);

    React.useEffect(() => {
        checkToken(token, setIsTokenValid, setLoading);
        getUser(token, setUser, setLoading);
        getNotes(token, setNotes, setLoading);
    }, [token]);

    function handleCreateClick() {
        setIsCreateActive(true);
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
                                                    <Note title={note.title} content={note.content} key={note.id} id={note.id} setNotes={setNotes} />
                                                ))}
                                            </>
                                        ) : <p className="no-notes">You don't have any notes yet. <br></br> Start by creating one.</p>}
                                    </div>
                                </>
                            ) : 'Errore nel caricare i dati'}
                            <button className="create-btn shadow" onClick={handleCreateClick}><CreateIcon style={{ color: 'white', fontSize: '2rem' }} /></button>
                        </section>
                    </>
                ) : <FailedAuth /> }
            </Container>
            {isCreateActive ? (
                <div className="overlay-container">
                    <div className="overlay shadow">
                        <CreateForm setIsActive={setIsCreateActive} />
                    </div>
                </div>
            ) : null}
        </main>
    );
}

export default Dashboard;