import axios from 'axios';

async function checkToken(token, setIsTokenValid, setLoading) {
    try {

        const response = await axios.get('http://localhost:5000/api/validateToken', { headers: {
            'Authorization': `Bearer ${token}`,
        }});

        console.log(response.data);
        setIsTokenValid(true);
    } catch (error) {
        console.log(error.response.data);
        setIsTokenValid(false);
    } finally {
        setLoading(false);
    }
}

async function getUser(token, setUser, setLoading) {
    try {

        const response = await axios.get(`http://localhost:5000/api/user`, { headers: {
            'Authorization': `Bearer ${token}`
        }});

        setUser(response.data.user);
    } catch (error) {
        console.log(error.response.data);
    } finally {
        setLoading(false);
    }
}

async function getNotes(token, setNotes, setLoading, category) {
    try {

        const response = await axios.get(`http://localhost:5000/api/getNotes?category=${category}`, { headers: {
            'Authorization': `Bearer ${token}`
        }});

        setNotes(response.data.notes);
    } catch (error) {
        console.log(error.response.data);
    } finally {
        setLoading(false);
    }
}

async function logout(token, setLoading) {
    try {

        const response = await axios.get(`http://localhost:5000/api/logout`, { headers: {
            'Authorization': `Bearer ${token}`
        }});

        localStorage.removeItem('token');
        console.log(response.data);
    } catch (error) {
        console.log(error.response.data);
    } finally {
        setLoading(false);
    }
}

async function deleteNote(token, id, setNotes) {
    try {

        const response = await axios.delete(`http://localhost:5000/api/deleteNote/${id}`, { headers: {
            'Authorization': `Bearer ${token}`
        }});

        console.log(response.data);
        setNotes(prevNotes => {
            return prevNotes.filter(note => {
                return note.id !== id;
            });
        });
    } catch (error) {
        console.log(error.response.data);
    }
}

async function editNote(token, id, note, setIsActive) {
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

async function createNote(token, note, setIsActive) {
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

export { checkToken, getUser, getNotes, logout, deleteNote, editNote, createNote };