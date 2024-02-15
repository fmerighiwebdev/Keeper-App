import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import NoteForm from './NoteForm';

import { deleteNote } from '../client-utils';

function Note(props) {
    const [isEditActive, setIsEditActive] = React.useState(false);
    const token = localStorage.getItem('token');
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
        deleteNote(token, props.id, props.setNotes)
    }

    return (
        <>
        <div className="note bounce-in" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className="note-header">
                <h2>{props.title}</h2>
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
            <p>{props.content}</p>
        </div>
        {isEditActive ? (
            <div className="overlay-container" style={{ backgroundColor: 'transparent' }}>
                <div className="overlay shadow animate__animated animate__backInUp animate__faster">
                    <NoteForm setIsActive={setIsEditActive} method="update" title={props.title} id={props.id} />
                </div>
            </div>
        ) : null}
        </>
    );
}

export default Note;