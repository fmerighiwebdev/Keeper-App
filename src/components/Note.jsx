import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteNote } from '../client-utils';

function Note(props) {

    const token = sessionStorage.getItem('token');
    const [isHovered, setIsHovered] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    function handleMouseOver() {
        setIsHovered(true);
    }

    function handleMouseOut() {
        setIsHovered(false);
    }

    function handleDeleteClick() {
        deleteNote(token, props.id, props.setNotes, setLoading)
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
        <div className="note" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className="note-header">
                <h2>{props.title}</h2>
                {isHovered ? (
                    <button onClick={handleDeleteClick}>
                        <DeleteIcon className='delete-icon' style={{ color: 'grey', fontSize: '1.75rem' }} />
                    </button>
                ) : null}
            </div>
            <p>{props.content}</p>
        </div>
    );
}

export default Note;