import React from "react";
import CloseIcon from '@mui/icons-material/Close';

import '../styles/Dashboard.css';

import { createNote, editNote } from "../client-utils";

function NoteForm({ setIsActive, method, title, id, category}) {

    const token = localStorage.getItem('token');
    const [note, setNote] = React.useState({
        title: '',
        content: '',
        category: category
    });

    function handleCloseClick() {
        setIsActive(false);
    }

    function handleChanges(event) {
        setNote({...note, [event.target.name]: event.target.value});
    }

    function handleCreate(event) {
        event.preventDefault();
        createNote(token, note, setIsActive);
    }

    function handleEdit(event) {
        event.preventDefault();
        editNote(token, id, note, setIsActive);
    }

    return (
        <div>
            <div className="note-form-header">
                <h1>{method === "update" ? `Modifica nota: ${title}` : `Crea nota in ${category.toUpperCase()}`}</h1>
                <button onClick={handleCloseClick}>
                    <CloseIcon style={{ fontSize: '2rem' }} />
                </button>
            </div>
            <form className="note-form" onSubmit={method === 'update' ? handleEdit : handleCreate}>
                <input category="text" placeholder="Titolo" name="title" onChange={handleChanges} />
                <textarea placeholder="Contenuto" name="content" onChange={handleChanges}></textarea>
                <button>{method === 'update' ? 'Modifica' : 'Crea'}</button>
            </form>
        </div>
    );
}

export default NoteForm;