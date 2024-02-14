import db from './index.js';

async function findUser(email) {
    try {
        const results = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        return results.rows[0];
    } catch (error) {
        console.error('Errore nella query findUser:', error);
    }
}

async function findUserById(id) {
    try {
        const results = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return results.rows[0];
    } catch (error) {
        console.error('Errore nella query findUserById:', error);
    }
}

async function createUser(email, username, password) {
    try {
        await db.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3)', [email, username, password]);
    } catch (error) {
        console.error('Errore nella query createUser:', error);
    }
}

async function createNote(title, content, user_id, category) {
    try {
        await db.query('INSERT INTO notes (title, content, user_id, category) VALUES ($1, $2, $3, $4)', [title, content, user_id, category]);
    } catch (error) {
        console.error('Errore nella query createNote:', error);
    }
}

async function getNotes(user_id, category) {
    try {
        const results = await db.query('SELECT * FROM notes WHERE user_id = $1 AND category = $2', [user_id, category]);
        return results.rows;
    } catch (error) {
        console.error('Errore nella query getNotes:', error);
    }
}

async function deleteNote(id) {
    try {
        await db.query('DELETE FROM notes WHERE id = $1', [id]);
    } catch (error) {
        console.error('Errore nella query deleteNote:', error);
    }
}

async function editNote(title, content, id) {
    try {
        await db.query('UPDATE notes SET title = $1, content = $2 WHERE id = $3', [title, content, id]);
    } catch (error) {
        console.error('Errore nella query editNote:', error);
    }
}   

export { findUser, findUserById, createUser, createNote, getNotes, deleteNote, editNote };