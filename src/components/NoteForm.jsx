import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

import '../styles/Dashboard.css';

function NoteForm({ setIsActive, method, title, id, type}) {

    const token = sessionStorage.getItem('token');
    const [note, setNote] = React.useState({
        title: '',
        content: '',
        type: type
    });

    function handleCloseClick() {
        setIsActive(false);
    }

    function handleChanges(event) {
        setNote({...note, [event.target.name]: event.target.value});
    }

    async function handleCreate(event) {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/createNote', note, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);

            setIsActive(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleEdit(event) {
        event.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/api/editNote/${id}`, note, { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            console.log(response.data);

            setIsActive(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
        <div className="note-form-header">
            <h1>{method === "update" ? `Modifica nota: ${title}` : `Crea nota in ${type.toUpperCase()}`}</h1>
            <button onClick={handleCloseClick}>
                <CloseIcon style={{ fontSize: '2rem' }} />
            </button>
        </div>
            <form className="note-form" onSubmit={method === 'update' ? handleEdit : handleCreate}>
                <input type="text" placeholder="Titolo" name="title" value={title} onChange={handleChanges} />
                <textarea placeholder="Contenuto" name="content" onChange={handleChanges}></textarea>
                <button>{method === 'update' ? 'Modifica' : 'Crea'}</button>
            </form>
        </div>
    );
}

export default NoteForm;