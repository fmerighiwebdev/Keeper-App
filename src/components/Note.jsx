import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import NoteForm from './NoteForm';

import { deleteNote } from '../client-utils';

function Note({ title, content, id, setNotes, setSuccessMessage, setLoading, category }) {
    const token = localStorage.getItem('token');

    const [isEditActive, setIsEditActive] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    function handleMouseOver() {
        setIsHovered(true);
    }

    function handleMouseOut() {
        setIsHovered(false);
    }
    
    function handleEditClick() {
        setIsEditActive(!isEditActive);
    }

    function handleDeleteClick() {
        setSuccessMessage('');
        deleteNote(token, id, setNotes, setSuccessMessage);
    }

    return (
        <>
        <div className="note bounce-in" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className="note-header">
                <h2>{title}</h2>
                {isHovered ? (
                    <div className="manage">
                        <button onClick={handleEditClick}>
                            <EditIcon className='edit-icon' style={{ color: 'grey', fontSize: '1.75rem' }} />
                        </button>
                        <button onClick={handleDeleteClick}>
                            <DeleteIcon className='delete-icon' style={{ color: 'grey', fontSize: '1.75rem' }} />
                        </button>
                    </div>
                ) : null}
            </div>
            <p>{content}</p>
        </div>
        {isEditActive ? (
            <div className="overlay-container">
                <div className="overlay fade-in-up">
                    <NoteForm 
                        setNotes={setNotes} 
                        setIsActive={setIsEditActive} 
                        setSuccessMessage={setSuccessMessage} 
                        setLoading={setLoading} 
                        category={category} 
                        method="update" 
                        title={title} 
                        id={id} 
                    />
                </div>
            </div>
        ) : null}
        </>
    );
}

export default Note;