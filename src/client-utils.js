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

export { checkToken };