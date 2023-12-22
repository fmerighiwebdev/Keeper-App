import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

import '../styles/Dashboard.css';

function CreateForm(props) {

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
        <div className="create-note-header">
            <h1>{props.type === "update" ? `Edit note: ${props.title}` : 'Create a note'}</h1>
            <button onClick={handleCloseClick}>
                <CloseIcon style={{ fontSize: '2rem' }} />
            </button>
        </div>
            <form className="create-form" onSubmit={props.type === 'update' ? handleEdit : handleCreate}>
                <input type="text" placeholder="Title" name="title" onChange={handleChanges} />
                <textarea placeholder="Content" name="content" onChange={handleChanges}></textarea>
                <button>{props.type === 'update' ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}

export default CreateForm;