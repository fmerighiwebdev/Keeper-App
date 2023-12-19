import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {

    const [isHovered, setIsHovered] = React.useState(false);

    function handleMouseOver() {
        setIsHovered(true);
    }

    function handleMouseOut() {
        setIsHovered(false);
    }

    return (
        <div className="note" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} key={props.key}>
            <div class="note-header">
                <h2>{props.title}</h2>
                {isHovered ? <DeleteIcon style={{ color: 'red', fontSize: '1.75rem' }} /> : null}
            </div>
            <p>{props.content}</p>
        </div>
    );
}

export default Note;