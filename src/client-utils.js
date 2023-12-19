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

async function getNotes(token, setNotes, setLoading) {
    try {
        const response = await axios.get(`http://localhost:5000/api/getNotes`, { headers: {
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
        sessionStorage.removeItem('token');
        console.log(response.data);
    } catch (error) {
        console.log(error.response.data);
    } finally {
        setLoading(false);
    }
}

export { checkToken, getUser, getNotes, logout };