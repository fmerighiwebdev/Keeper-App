import React from "react";
import { Container } from "react-bootstrap";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import SessionExp from './SessionExp';
import Note from "./Note";
import NoteForm from "./NoteForm";
import Header from "./Header";

import "../styles/Dashboard.css";

import { checkToken, getNotes } from "../client-utils";

function Dashboard({ category }) {
    const token = localStorage.getItem('token');

    const [isTokenValid, setIsTokenValid] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [isCreateActive, setIsCreateActive] = React.useState(false);
    const [notes, setNotes] = React.useState([]);
    const [successMessage, setSuccessMessage] = React.useState('');

    React.useEffect(() => {
        checkToken(token, setIsTokenValid, setLoading);
        getNotes(token, setNotes, setLoading, category);
    }, [token, category]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setSuccessMessage('');
        }, 5000);

        return () => clearTimeout(timeout);
    }, [successMessage]);

    function handleCreateClick() {
        setIsCreateActive(true);
    }

    if (loading) {
        return (
            <main className="loading-page">
                <div className="spinner-grow" style={{ width: '2rem', height: '2rem', color: 'greenyellow' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </main>
        );
    }

    return (
        <main>
            <Container>
                {isTokenValid ? (
                    <>
                        <section className="dashboard">
                            {notes ? (
                                <>
                                    <Header setIsTokenValid={setIsTokenValid} category={category} />
                                    {notes.length > 0 ? (
                                        <div className="notes-grid">
                                            <>
                                                {notes.map(note => (
                                                    <Note 
                                                        title={note.title} 
                                                        content={note.content} 
                                                        key={note.id} 
                                                        id={note.id} 
                                                        setSuccessMessage={setSuccessMessage} 
                                                        setNotes={setNotes} 
                                                        setLoading={setLoading} 
                                                        category={category} 
                                                    />
                                                ))}
                                            </>
                                        </div>
                                    ) : <p className="no-notes">Non hai ancora creato nessuna nota. <br></br> Inizia creandone una!</p>}
                                </>
                            ) : <p className="no-notes">Errore nel caricare i dati.</p>}
                            <button className="create-btn shadow" onClick={handleCreateClick}>
                                <AddCircleIcon style={{ color: 'white', fontSize: '2.5rem' }} />
                            </button>
                        </section>
                    </>
                ) : <SessionExp />}
            </Container>
            {isCreateActive ? (
                <div className="overlay-container">
                    <div className="overlay shadow-lg fade-in-up">
                        <NoteForm 
                            setSuccessMessage={setSuccessMessage} 
                            setNotes={setNotes} 
                            setIsActive={setIsCreateActive} 
                            setLoading={setLoading} 
                            category={category} 
                        />
                    </div>
                </div>
            ) : null}
            <div className="alert-container">
                {successMessage ? (
                    <>
                        <div className="success-alert fade-in-down fast">
                            <p className="mb-0">{successMessage}</p>
                        </div>
                    </>
                ) : null}
            </div>
        </main>
    );
}

export default Dashboard;