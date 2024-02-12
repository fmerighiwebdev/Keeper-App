import React from "react";

import SessionExp from './SessionExp';
import Note from "./Note";
import NoteForm from "./NoteForm";
import Header from "./Header";

import "../styles/Dashboard.css";
import { Container } from "react-bootstrap";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { checkToken, getNotes } from "../client-utils";

function Dashboard({ category }) {

    const token = localStorage.getItem('token');
    const [isTokenValid, setIsTokenValid] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [isCreateActive, setIsCreateActive] = React.useState(false);
    const [notes, setNotes] = React.useState([]);

    React.useEffect(() => {
        checkToken(token, setIsTokenValid, setLoading);
        getNotes(token, setNotes, setLoading, category);
    }, [token, category]);

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
                                    <div className="notes-grid">
                                        {notes.length > 0 ? (
                                            <>
                                                {notes.map(note => (
                                                    <Note title={note.title} content={note.content} key={note.id} id={note.id} setNotes={setNotes} />
                                                ))}
                                            </>
                                        ) : <p className="no-notes">Non hai ancora creato nessuna nota. <br></br> Inizia creandone una!</p>}
                                    </div>
                                </>
                            ) : 'Errore nel caricare i dati'}
                            <button className="create-btn shadow" onClick={handleCreateClick}><AddCircleIcon style={{ color: 'white', fontSize: '2.5rem' }} /></button>
                        </section>
                    </>
                ) : <SessionExp />}
            </Container>
            {isCreateActive ? (
                <div className="overlay-container">
                    <div className="overlay shadow-lg animate__animated animate__backInUp animate__faster">
                        <NoteForm setIsActive={setIsCreateActive} category={category} />
                    </div>
                </div>
            ) : null}
        </main>
    );
}

export default Dashboard;