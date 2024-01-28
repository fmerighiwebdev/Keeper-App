import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

import '../styles/Dashboard.css';

function NoteForm(props) {

    const token = sessionStorage.getItem('token');
    const [note, setNote] = React.useState({
        title: '',
        content: ''
    });

    function handleCloseClick() {
        props.setIsActive(false);
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

            props.setIsActive(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleEdit(event) {
        event.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/api/editNote/${props.id}`, note, { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            console.log(response.data);

            props.setIsActive(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
        <div className="note-form-header">
            <h1>{props.type === "update" ? `Modifica nota: ${props.title}` : 'Crea nota'}</h1>
            <button onClick={handleCloseClick}>
                <CloseIcon style={{ fontSize: '2rem' }} />
            </button>
        </div>
            <form className="note-form" onSubmit={props.type === 'update' ? handleEdit : handleCreate}>
                <input type="text" placeholder="Titolo" name="title" value={props.title} onChange={handleChanges} />
                <textarea placeholder="Contenuto" name="content" onChange={handleChanges}></textarea>
                <button>{props.type === 'update' ? 'Modifica' : 'Crea'}</button>
            </form>
        </div>
    );
}

export default NoteForm;